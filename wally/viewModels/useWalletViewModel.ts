import { Transaction, TransactionType } from "@/app/types"
import { useAuthStore } from "@/store/authStore"
import { useQuery } from "@tanstack/react-query"
import { addMonths, format, getMonth, getYear, isFuture, isSameMonth, isSameYear, subMonths } from "date-fns"
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
    const dataAtual = new Date()
    const mesAtual = getMonth(dataAtual)
    const anoAtualState = getYear(dataAtual)

    const [currentMonth, setCurrentMonth] = useState(meses[mesAtual])
    const [currentMonthIndex, setCurrentMonthIndex] = useState(mesAtual)
    const [currentYear, setCurrentYear] = useState(anoAtualState)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [activeDateTab, setActiveDateTab] = useState<"month" | "year">("month")
    const [searchQuery, setSearchQuery] = useState("")

    const [receitas, setReceitas] = useState(0)
    const [despesas, setDespesas] = useState(0)

    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [dialogVisible, setDialogVisible] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const [activeTransactionType, setActiveTransactionType] = useState<TransactionType | null>(null)
    const [transactionDate, setTransactionDate] = useState(new Date())
    const [transactionValue, setTransactionValue] = useState("")
    const [transactionDescription, setTransactionDescription] = useState("")

    const token = useAuthStore((s) => s.token)
    const usuario = useAuthStore((s) => s.user)

    const { data: statusUsuario } = useQuery<StatusUsuario>({
        queryKey: ["statusUsuario"],
        queryFn: async () => {
            const searchParams = new URLSearchParams({
                usuario_id: usuario?.id as string,
                data_inicial: "2025-01-01",
                data_final: "2025-05-31",
            })


            const response = await fetch(`http://localhost:3333/status/balanco?${searchParams.toString()}`, {
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
                isSameMonth(transaction.date, new Date(currentYear, currentMonthIndex)) &&
                isSameYear(transaction.date, new Date(currentYear, currentMonthIndex))
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

    useEffect(() => {
        let totalReceitas = 0
        let totalDespesas = 0

        filteredTransactionsByMonth.forEach((transaction) => {
            if (transaction.type === "receita") {
                totalReceitas += transaction.amount
            } else {
                totalDespesas += transaction.amount
            }
        })

        setReceitas(totalReceitas)
        setDespesas(totalDespesas)
        // setSaldo(totalReceitas - totalDespesas)
    }, [filteredTransactionsByMonth])

    const mudarMes = (direcao: "anterior" | "proximo") => {
        const dataAtual = new Date(currentYear, currentMonthIndex, 1)
        const novaData = direcao === "anterior" ? subMonths(dataAtual, 1) : addMonths(dataAtual, 1)

        const novoMesIndex = getMonth(novaData)
        const novoAno = getYear(novaData)

        setCurrentMonthIndex(novoMesIndex)
        setCurrentMonth(meses[novoMesIndex])
        setCurrentYear(novoAno)
    }

    const showDatePickerModal = (tab: "month" | "year") => {
        setActiveDateTab(tab)
        setShowDatePicker(true)
    }

    const handleMonthSelect = (index: number, month: string) => {
        setCurrentMonthIndex(index)
        setCurrentMonth(month)
        setShowDatePicker(false)
    }

    const handleYearSelect = (year: number) => {
        setCurrentYear(year)
        setShowDatePicker(false)
    }

    const showTransactionDialog = useCallback((type: TransactionType) => {
        setTransactionDate(new Date())
        setTransactionValue("")
        setTransactionDescription("")
        setActiveTransactionType(type)
        setDialogVisible(true)
    }, [])

    const hideTransactionDialog = () => {
        setDialogVisible(false)
        setShowPicker(false)
        setActiveTransactionType(null)
        setTransactionValue("")
        setTransactionDescription("")
    }

    const toggleDataPicker = () => {
        Keyboard.dismiss()
        setShowPicker(!showPicker)
    }

    const handleDateChange = ({ type }: any, selectedDate?: Date) => {
        if (type === "set" && selectedDate) {
            if (isFuture(selectedDate)) {
                Alert.alert("Data inválida", "Não é possível adicionar transações com datas futuras.", [{ text: "OK" }])
                return
            }

            setTransactionDate(selectedDate)

            if (Platform.OS === "android") {
                setShowPicker(false)
            }
        } else {
            setShowPicker(false)
        }
    }

    const isValidTransactionValue = (value: string): boolean => {
        if (!value) return false
        const numValue = Number.parseFloat(value.replace(",", "."))
        return !isNaN(numValue) && numValue > 0
    }

    const adicionarTransacao = () => {
        if (!isValidTransactionValue(transactionValue)) {
            Alert.alert("Erro", "Por favor, insira um valor válido")
            return
        }

        if (isFuture(transactionDate)) {
            Alert.alert("Data inválida", "Não é possível adicionar transações com datas futuras.")
            return
        }

        const valor = Number.parseFloat(transactionValue.replace(",", "."))

        const novaTransacao: Transaction = {
            id: Date.now().toString(),
            type: activeTransactionType!,
            amount: valor,
            description: transactionDescription || (activeTransactionType === "receita" ? "Receita" : "Despesa"),
            date: transactionDate,
        }

        setTransactions((prev) => [novaTransacao, ...prev])
        hideTransactionDialog()
    }

    const removerTransacao = (id: string) => {
        setTransactions((prev) => prev.filter((transaction) => transaction.id !== id))
    }

    const transactionForm = useForm({
        defaultValues: {
            nome: "",
            valor: "",
            data: null,
            tipo: "",
            usuario_id: ""
        }
    })

    return {
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