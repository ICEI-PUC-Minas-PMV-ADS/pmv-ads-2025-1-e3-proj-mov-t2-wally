import { CreateTransactionFormData, Transaction, TransactionType } from "@/app/types"
import { useAuthStore } from "@/store/authStore"
import { API_URL } from "@env"
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { add, addDays, addMonths, format, getMonth, getYear, isFuture, isSameMonth, isSameYear, subMonths } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Keyboard, Alert, Platform } from "react-native"


interface StatusUsuario {
    saldo: number,
    totalReceitas: number,
    totalDespesas: number,
    transacoes: {
        id: string,
        nome: string,
        valor: string,
        tipo: string,
        usuario_id: string,
        data: string,
        data_criacao: string,
        data_atualizacao: string | null,
        data_exclusao: string | null,
    }[]
}

const meses = Array.from(
    { length: 12 },
    (_, i) => format(new Date(2024, i, 1), "MMMM", { locale: ptBR }).replace(/^\w/, (c) => c.toUpperCase()),
)

const anoAtual = new Date().getFullYear()
const anos = Array.from({ length: anoAtual - 2009 }, (_, i) => 2010 + i)

export function useWalletViewModel() {
    const queryClient = new QueryClient()

    const dataAtual = new Date()
    const mesAtual = getMonth(dataAtual)
    const anoAtualState = getYear(dataAtual)

    const [currentMonth, setCurrentMonth] = useState(meses[mesAtual])
    const [currentMonthIndex, setCurrentMonthIndex] = useState(mesAtual)
    const [currentYear, setCurrentYear] = useState(anoAtualState)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [activeDateTab, setActiveDateTab] = useState<"month" | "year">("month")
    const [searchQuery, setSearchQuery] = useState("")

    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [dialogVisible, setDialogVisible] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const [activeTransactionType, setActiveTransactionType] = useState<TransactionType | null>(null)
    const [transactionDate, setTransactionDate] = useState(new Date())
    const [transactionValue, setTransactionValue] = useState("")
    const [transactionDescription, setTransactionDescription] = useState("")

    const token = useAuthStore((s) => s.token)
    const usuario = useAuthStore((s) => s.user)

    const date = new Date()
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const [dataInicial, setDataInicial] = useState(firstDayOfMonth)
    const [dataFinal, setDataFinal] = useState(lastDayOfMonth)

    const { data: statusUsuario = {
        saldo: 0,
        totalReceitas: 0,
        totalDespesas: 0,
        transacoes: [],
    }, refetch: refetchStatusUsuario } = useQuery<StatusUsuario>({
        queryKey: ["statusUsuario", dataInicial, dataFinal],
        queryFn: async () => {
            const searchParams = new URLSearchParams({
                usuario_id: usuario?.id as string,
                data_inicial: format(dataInicial, "yyyy-MM-dd"),
                data_final: format(dataFinal, "yyyy-MM-dd"),
            })

            console.log({ url: `${API_URL}/status/balanco?${searchParams.toString()}` })
            const response = await fetch(`${API_URL}/status/balanco?${searchParams.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.json()
        },
        enabled: !!token && !!usuario,
    })

    console.log({ statusUsuario })
    const currencyFormatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    })

    const formatCurrency = (value: number) => {
        return currencyFormatter.format(value)
    }

    const formatDateForDisplay = (date: Date) => {
        return format(date, "dd/MM/yyyy", { locale: ptBR })
    }

    const filteredTransactionsByMonth = useMemo(() => {
        return transactions.filter((transaction) => {
            return (
                isSameMonth(transaction.data, new Date(currentYear, currentMonthIndex)) &&
                isSameYear(transaction.data, new Date(currentYear, currentMonthIndex))
            )
        })
    }, [transactions, currentMonthIndex, currentYear])

    const filteredTransactions = useMemo(() => {
        if (statusUsuario) {
            if (searchQuery.trim() === "") {
                return statusUsuario.transacoes
            } else {
                return statusUsuario.transacoes.filter((transaction) => {
                    const searchLower = searchQuery.toLowerCase()
                    const descriptionMatch = transaction.nome.toLowerCase().includes(searchLower)
                    const valueMatch = transaction.valor.toString().includes(searchLower)
                    const typeMatch = transaction.tipo.toLowerCase().includes(searchLower)
                    return descriptionMatch || valueMatch || typeMatch
                })
            }
        }
    }, [statusUsuario?.transacoes, filteredTransactionsByMonth, searchQuery])



    const mudarMes = useCallback((direcao: "anterior" | "proximo") => {
        const dataAtual = new Date(currentYear, currentMonthIndex, 1)
        const novaData = direcao === "anterior" ? subMonths(dataAtual, 1) : addMonths(dataAtual, 1)

        const firstDayOfMonth = new Date(novaData.getFullYear(), novaData.getMonth(), 1)
        const lastDayOfMonth = new Date(novaData.getFullYear(), novaData.getMonth() + 1, 0, 23, 59, 59, 999)


        console.log({ firstDayOfMonth, lastDayOfMonth })
        setDataInicial(firstDayOfMonth)
        setDataFinal(lastDayOfMonth)

        const novoMesIndex = getMonth(novaData)
        const novoAno = getYear(novaData)

        setCurrentMonthIndex(novoMesIndex)
        setCurrentMonth(meses[novoMesIndex])
        setCurrentYear(novoAno)


    }, [currentMonthIndex, currentYear])

    const showDatePickerModal = (tab: "month" | "year") => {
        setActiveDateTab(tab)
        setShowDatePicker(true)
    }

    const handleMonthSelect = useCallback((index: number, month: string) => {
        setCurrentMonthIndex(index)
        setCurrentMonth(month)


        const firstDayOfMonth = new Date(dataInicial.getFullYear(), index, 1)
        const lastDayOfMonth = new Date(dataInicial.getFullYear(), index + 1, 0, 23, 59, 59, 999)

        setDataInicial(firstDayOfMonth)
        setDataFinal(lastDayOfMonth)

        setShowDatePicker(false)
    }, [dataInicial])

    const handleYearSelect = useCallback((year: number) => {
        //setCurrentYear(year)
        const firstDayOfMonth = new Date(year, dataInicial.getMonth(), 1)
        const lastDayOfMonth = new Date(year, dataInicial.getMonth() + 1, 0, 23, 59, 59, 999)

        setDataInicial(firstDayOfMonth)
        setDataFinal(lastDayOfMonth)

        setShowDatePicker(false)
    }, [dataInicial])

    const showTransactionDialog = useCallback((type: TransactionType) => {
        setTransactionDate(new Date())
        setTransactionValue("")
        setTransactionDescription("")
        setActiveTransactionType(type)
        transactionForm.setValue("tipo", type)
        setDialogVisible(true)
    }, [])

    const hideTransactionDialog = () => {
        setDialogVisible(false)
        setShowPicker(false)
        setActiveTransactionType(null)
        setTransactionValue("")
        setTransactionDescription("")
        transactionForm.reset()
    }

    const toggleDataPicker = () => {
        Keyboard.dismiss()
        setShowPicker(!showPicker)
    }

    const handleDateChange = useCallback(({ type }: any, selectedDate?: Date) => {
        console.log({ type, selectedDate })
        if (type === "set" && selectedDate) {
            // if (isFuture(selectedDate)) {
            //     Alert.alert("Data inválida", "Não é possível adicionar transações com datas futuras.", [{ text: "OK" }])
            //     return
            // }

            setTransactionDate(selectedDate)



            if (Platform.OS === "android") {
                setShowPicker(false)
            }
        } else {
            setShowPicker(false)
        }
    }, [])

    const isValidTransactionValue = (value: string): boolean => {
        if (!value) return false
        const numValue = Number.parseFloat(value.replace(",", "."))
        return !isNaN(numValue) && numValue > 0
    }

    const transactionForm = useForm<CreateTransactionFormData>({
        defaultValues: {
            nome: "",
            valor: 0,
            data: new Date(),
            tipo: "",
        }
    })


    const { mutateAsync: adicionarTransacao } = useMutation({
        mutationFn: async (transaction: CreateTransactionFormData) => {
            console.log("Adicionando transação")
            const response = await fetch(`${API_URL}/transacoes`, {
                method: "POST",
                body: JSON.stringify(transaction),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            return response.json()
        }
    })

    const handleSubmitTransaction = useCallback(async () => {
        // if (!isValidTransactionValue(transactionValue)) {
        //     Alert.alert("Erro", "Por favor, insira um valor válido")
        //     return
        // }

        // if (isFuture(transactionDate)) {
        //     Alert.alert("Data inválida", "Não é possível adicionar transações com datas futuras.")
        //     return
        // }

        // const valor = Number.parseFloat(transactionValue.replace(",", "."))

        console.log("Transaction FORM")
        transactionForm.handleSubmit(async ({ nome, data, tipo, valor }) => {
            console.log({ nome, data, tipo, valor })
            try {
                const transacao = await adicionarTransacao({
                    nome,
                    valor,
                    tipo,
                    data,
                })

                console.log({ transacao })

                //Add set query data
                await refetchStatusUsuario()
            } catch (error) {
                console.log(error)
            }
        })()

        console.log("Transaction FORM 2")
        hideTransactionDialog()
    }, [activeTransactionType, transactionDescription, transactionDate, transactionValue, hideTransactionDialog])


    const { mutateAsync: deleteUserTransaction } = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`${API_URL}/transacoes?id=${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({})
            })
        }
    })

    const removerTransacao = useCallback(async (id: string) => {
        await deleteUserTransaction(id)

        await refetchStatusUsuario()
    }, [])



    return {
        handleSubmitTransaction,
        currentMonth,
        currentMonthIndex,
        currentYear,
        showDatePicker,
        activeDateTab,
        searchQuery,
        saldo: statusUsuario?.saldo,
        receitas: statusUsuario?.totalReceitas,
        despesas: statusUsuario?.totalDespesas,
        transactions: statusUsuario?.transacoes,
        dialogVisible,
        showPicker,
        activeTransactionType,
        transactionValue,
        transactionDescription,
        formatCurrency,
        formatDateForDisplay,
        showDatePickerModal,
        handleMonthSelect,
        handleYearSelect,
        showTransactionDialog,
        hideTransactionDialog,
        toggleDataPicker,
        handleDateChange,
        adicionarTransacao,
        removerTransacao,
        mudarMes,
        meses,
        anos,
        filteredTransactions,
        filteredTransactionsByMonth,
        isValidTransactionValue,
        setSearchQuery,
        setCurrentMonth,
        setCurrentMonthIndex,
        setCurrentYear,
        setShowDatePicker,
        setActiveDateTab,
        transactionDate,
        setTransactionValue,
        setTransactionDescription,
        setShowPicker,
        setActiveTransactionType,
        setDialogVisible,
        setTransactions,
        transactionForm,

    }
}