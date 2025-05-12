export type TransactionType = "RECEITA" | "DESPESA"

export type Transaction = {
  id: string,
  nome: string,
  valor: string,
  tipo: string,
  usuario_id: string,
  data: string,
  data_criacao: string,
  data_atualizacao: string | null,
}


export type TransactionGroup = {
  date: Date
  data: Transaction[]
}

export type CreateTransactionFormData = {
  nome: string,
  valor: number,
  tipo: TransactionType | "",
  data: Date,
}