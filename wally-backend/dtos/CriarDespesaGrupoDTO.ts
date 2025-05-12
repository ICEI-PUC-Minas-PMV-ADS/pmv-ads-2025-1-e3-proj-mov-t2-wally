export interface CriarDespesaGrupoDTO {
  despesa_id_unico: string
  nome: string
  valor: number
  tipo: string
  total_pago: number
  data_pago: Date
  usuario_criador: boolean
  grupo_membros_id: string
}
