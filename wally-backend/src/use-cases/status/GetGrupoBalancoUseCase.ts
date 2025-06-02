import { GruposRepositorio } from '../../repositorios/GruposRepositorio'
import { DespesasGrupoRepositorio } from '../../repositorios/DespesasGrupoRepositorio'
import { GrupoMembrosRepositorio } from '../../repositorios/GrupoMembrosRepositorio'
import { UsuariosRepositorio } from 'repositorios/UsuariosRepositorio'

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
    private readonly usuariosRepositorio: UsuariosRepositorio,
  ) {}

  async execute({
    grupo_id,
    usuario_id,
  }: GetGrupoBalancoUseCaseParams): Promise<IResponse> {
    const [grupo, usuario] = await Promise.all([
      this.gruposRepositorio.findById(grupo_id),
      this.usuariosRepositorio.findById(usuario_id),
    ])

    if (!grupo) {
      return { success: false, data: null, error: 'Grupo não encontrado.' }
    }

    if (!usuario) {
      return { success: false, data: null, error: 'Usuario não encontrado.' }
    }

    const grupoMembros =
      await this.grupoMembrosRepositorio.findAllByGroupId(grupo_id)

    // console.log({ grupoMembros })

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

    const despesasGrupo =
      await this.despesasGruposRepositorio.findAllDespesasByGrupoId(
        grupoMembros.map(({ id }) => id),
      )

    const pagamentos = despesasGrupo.filter(
      (transacao) => transacao.tipo === 'PAGAMENTO',
    )

    const despesas = despesasGrupo.filter(
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

      const usuario = grupoMembros.find(
        (gm) => gm.id === pagamento.grupo_membros_id,
      )

      console.log({
        nome: pagamento.nome,
        usuario_id: pagamento.grupo_membros_id,
        usuario_nome: usuario?.user.nome,
        valor_total: Number(pagamento.valor_total),
        valor_pego_emprestado:
          emprestou || !envolvido ? null : Number(valorPegoEmprestado),
        data: pagamento.data_criacao,
        envolvido,
        emprestou,
      })

      return {
        nome: pagamento.nome,
        usuario_id: pagamento.grupo_membros_id,
        usuario_nome: usuario?.user.nome,
        valor_total: Number(pagamento.valor_total),
        valor_pego_emprestado:
          emprestou || !envolvido ? null : Number(valorPegoEmprestado),
        data: pagamento.data_criacao,
        envolvido,
        emprestou,
      }
    })

    return {
      success: true,
      data: {
        ...grupo,
        transacoes: transacoes.sort(
          (a, b) => b.data.getTime() - a.data.getTime(),
        ),
      },
      error: null,
    }
  }
}
