import {
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Pressable,
} from "react-native"
import { PaperProvider } from "react-native-paper"
import { Header } from "@/components/Header"
import { BalanceCard } from "@/components/BalanceCard"
import { ActionButtons } from "@/components/ActionButtons"
import { TransactionList } from "@/components/TransactionList"
import { DatePickerModal } from "@/components/DatePickerModal"
import { TransactionDatePicker } from "@/components/TransactionDatePicker"
import { AddTransactionDialog } from "@/components/AddTransactionDialog"
import { router } from "expo-router"
import { useAuthStore } from "@/store/authStore"
import { useWalletViewModel } from "@/viewModels/useWalletViewModel"
import { Controller } from "react-hook-form"
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Wallet() {
  const { logout } = useAuthStore()
  const {
    currentMonth,
    currentYear,
    saldo,
    receitas,
    despesas,
    filteredTransactions,
    searchQuery,
    setSearchQuery,
    showDatePickerModal,
    showTransactionDialog,
    removerTransacao,
    adicionarTransacao,
    handleMonthSelect,
    handleYearSelect,
    formatCurrency,
    formatDateForDisplay,
    toggleDataPicker,
    showPicker,
    dialogVisible,
    activeTransactionType,
    transactionValue,
    transactionDescription,
    transactionDate,
    currentMonthIndex,
    setShowDatePicker,
    setActiveDateTab,
    showDatePicker,
    activeDateTab,
    meses,
    anos,
    handleDateChange,
    hideTransactionDialog,
    mudarMes,
    setTransactionValue,
    setTransactionDescription,
    setShowPicker,
    transactionForm,
    handleSubmitTransaction,
  } = useWalletViewModel()

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#9ACBD0" barStyle="dark-content" />

        <Header />
        <Pressable
          onPress={async () => {
            await logout()
            router.replace("/(auth)/login")
          }}>
          <AntDesign style={styles.logout} name="logout" size={20} color="#006A71" />
        </Pressable>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={true}
        >
          <BalanceCard
            currentMonth={currentMonth}
            currentYear={currentYear}
            saldo={saldo}
            receitas={receitas}
            despesas={despesas}
            onPreviousMonth={() => mudarMes("anterior")}
            onNextMonth={() => mudarMes("proximo")}
            onSelectMonth={() => showDatePickerModal("month")}
            onSelectYear={() => showDatePickerModal("year")}
            formatCurrency={formatCurrency}
          />

          <ActionButtons onAddTransaction={showTransactionDialog} />

          <TransactionList
            transactions={filteredTransactions}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            formatCurrency={formatCurrency}
            onDeleteTransaction={removerTransacao}
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
        </ScrollView>

        <DatePickerModal
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          activeTab={activeDateTab}
          onTabChange={setActiveDateTab}
          currentMonthIndex={currentMonthIndex}
          currentYear={currentYear}
          onMonthSelect={handleMonthSelect}
          onYearSelect={handleYearSelect}
          meses={meses}
          anos={anos}
        />

        <AddTransactionDialog
          visible={dialogVisible}
          onDismiss={hideTransactionDialog}
          activeTransactionType={activeTransactionType}
          transactionValue={transactionValue}
          onTransactionValueChange={setTransactionValue}
          transactionDescription={transactionDescription}
          onTransactionDescriptionChange={setTransactionDescription}
          formattedDate={formatDateForDisplay(transactionDate)}
          onDatePress={toggleDataPicker}
          handleSubmitTransaction={handleSubmitTransaction}
          transactionForm={transactionForm}
        />

        <Controller
          control={transactionForm.control}
          name="data"
          render={({ field }) => (
            <TransactionDatePicker
              visible={showPicker}
              onClose={() => setShowPicker(false)}
              date={field.value}
              onChange={(set, date) => {
                handleDateChange(set, date)

                field.onChange(date)
              }}
            />
          )}
        />
      </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F2F2",
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
    logout: {
    position: 'absolute',
    bottom: 64,
    right: 16,
  },
})