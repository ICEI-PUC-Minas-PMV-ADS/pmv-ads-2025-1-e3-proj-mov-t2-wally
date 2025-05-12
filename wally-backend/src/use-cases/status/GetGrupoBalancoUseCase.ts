import { DespesasGrupoRepositorio } from '../../repositorios/DespesasGrupoRepositorio'
import { GrupoMembrosRepositorio } from '../../repositorios/GrupoMembrosRepositorio'

interface GetGrupoBalancoUseCaseParams {
  grupo_id: string
  usuario_id: string
}

export class GetGrupoBalancoUseCase {
  constructor(
    private readonly grupoMembrosRepositorio: GrupoMembrosRepositorio,
    private readonly despesasGruposRepositorio: DespesasGrupoRepositorio,
  ) {}

  async execute({ grupo_id, usuario_id }: GetGrupoBalancoUseCaseParams) {
    const grupoMembros =
      await this.grupoMembrosRepositorio.findAllByGroupId(grupo_id)

    if (grupoMembros.length === 0) {
      return {
        success: false,
        despesas: [],
        error: 'Grupo não encontrado',
      }
    }

    const grupoMembro = grupoMembros.find(
      (membro) => membro.usuario_id === usuario_id,
    )

    if (!grupoMembro) {
      return {
        success: false,
        despesas: [],
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

    return transacoes
  }
}
