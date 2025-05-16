import { View, Text, StyleSheet } from "react-native"
import { Searchbar } from "react-native-paper"
import { TransactionItem } from "./TransactionItem"
import { EmptyState } from "./EmptyState"
import { Transaction, TransactionGroup } from "@/app/types"
import { format, isToday, parseISO, set } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useMemo } from "react"
import util from 'util'

type TransactionListProps = {
  transactions: {
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
  searchQuery: string
  onSearchChange: (query: string) => void
  formatCurrency: (value: number) => string
  onDeleteTransaction: (id: string) => void
  currentMonth: string
  currentYear: number
}

export const TransactionList = ({
  transactions,
  searchQuery,
  onSearchChange,
  formatCurrency,
  onDeleteTransaction,
  currentMonth,
  currentYear,
}: TransactionListProps) => {
  const formatDate = (date: Date) => {
    if (isToday(date)) {
      return "Hoje"
    }

    const weekday = format(date, "EEEE", { locale: ptBR }).replace(/^\w/, (c) => c.toUpperCase())
    const day = format(date, "dd")

    return `${weekday}, ${day}`
  }

  const groupTransactionsByDate = (transactions: Transaction[]): TransactionGroup[] => {
    if (!transactions) return []





    const sortedGroups = transactions.sort((a, b) => b.data.localeCompare(a.data))


    const groups: { [key: string]: Transaction[] } = {}

    transactions.forEach((transaction) => {
      const dateKey = transaction.data

      if (!groups[dateKey]) {
        groups[dateKey] = []
      }

      groups[dateKey].push(transaction)
    })



    return Object.entries(groups).map(([date, transactions]) => {

      const baseDate = parseISO(date)
      return {
        data: transactions,
        date: set(baseDate, {
          hours: 3,
          minutes: 0,
          seconds: 0
        })
      }
    })

  }

  const groupedTransactions = useMemo(() => groupTransactionsByDate(transactions), [transactions])

  return (
    <>
      <Searchbar
        placeholder="Filtrar transações"
        onChangeText={onSearchChange}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchbarInput}
        iconColor="#84B3B6"
        accessible={true}
        accessibilityLabel="Filtrar transações"
        accessibilityHint="Digite para filtrar suas transações"
      />

      {groupedTransactions.length > 0 ? (
        groupedTransactions.map((group, index) => (
          <View key={index}>
            <Text style={styles.transactionGroupTitulo}>{formatDate(group.date)}</Text>

            {group.data.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                formatCurrency={formatCurrency}
                onDelete={onDeleteTransaction}
              />
            ))}
          </View>
        ))
      ) : (
        <EmptyState
          searchQuery={searchQuery}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 8,
    height: 60,
  },
  searchbarInput: {
    fontFamily: "Inter",
    fontSize: 12,
    color: "#000",
  },
  transactionGroupTitulo: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
    color: "#777",
  },
})