import { GruposRepositorio } from 'repositorios/GruposRepositorio'
import { DespesasGrupoRepositorio } from '../../repositorios/DespesasGrupoRepositorio'
import { GrupoMembrosRepositorio } from '../../repositorios/GrupoMembrosRepositorio'

interface GetGrupoBalancoUseCaseParams {
  grupo_id: string
  usuario_id: string
}

interface Transacao {
  nome: string
  usuario_id: string
  valor_total: number
  valor_pego_emprestado: number | null
  data: Date
  envolvido: boolean
  emprestou: boolean
}

interface GetGrupoBalancoUseCaseResponse {
  nome: string
  transacoes: Transacao[]
}

interface IResponse {
  success: boolean
  data: GetGrupoBalancoUseCaseResponse | null
  error: any | null
}

export class GetGrupoBalancoUseCase {
  constructor(
    private readonly grupoMembrosRepositorio: GrupoMembrosRepositorio,
    private readonly despesasGruposRepositorio: DespesasGrupoRepositorio,
    private readonly gruposRepositorio: GruposRepositorio,
  ) {}

  async execute({
    grupo_id,
    usuario_id,
  }: GetGrupoBalancoUseCaseParams): Promise<IResponse> {
    const grupo = await this.gruposRepositorio.findById(grupo_id)

    if (!grupo) {
      return { success: false, data: null, error: 'Grupo não encontrado.' }
    }

    const grupoMembros =
      await this.grupoMembrosRepositorio.findAllByGroupId(grupo_id)

    if (grupoMembros.length === 0) {
      return {
        success: false,
        data: null,
        error: 'Grupo não encontrado',
      }
    }

    const grupoMembro = grupoMembros.find(
      (membro) => membro.usuario_id === usuario_id,
    )

    if (!grupoMembro) {
      return {
        success: false,
        data: null,
        error: 'Usuário não encontrado no grupo',
      }
    }

    const transacoesGrupo =
      await this.despesasGruposRepositorio.findAllDespesasByGrupoId(
        grupoMembros.map((membro) => membro.id),
      )

    const pagamentos = transacoesGrupo.filter(
      (transacao) => transacao.tipo === 'PAGAMENTO',
    )

    const despesas = transacoesGrupo.filter(
      (transacao) => transacao.tipo === 'DESPESA',
    )

    console.log({ transacoesGrupo, pagamentos, despesas })

    const transacoes = pagamentos.map((pagamento) => {
      const valorPegoEmprestado =
        despesas.find(
          (despesa) =>
            despesa.despesa_id_unico === pagamento.despesa_id_unico &&
            despesa.grupo_membros_id === grupoMembro.id,
        )?.valor || null

      const emprestou = pagamento.grupo_membros_id === grupoMembro.id

      const envolvido =
        !!despesas.find(
          (despesa) =>
            despesa.despesa_id_unico === pagamento.despesa_id_unico &&
            despesa.grupo_membros_id === grupoMembro.id,
        ) || emprestou

      return {
        nome: pagamento.nome,
        usuario_id: pagamento.grupo_membros_id,
        valor_total: Number(pagamento.valor_total),
        valor_pego_emprestado:
          emprestou || !envolvido ? null : Number(valorPegoEmprestado),
        data: pagamento.data_criacao,
        envolvido,
        emprestou,
      }
    })

    console.log({ transacoes })

    return { success: true, data: { ...grupo, transacoes }, error: null }
  }
}
