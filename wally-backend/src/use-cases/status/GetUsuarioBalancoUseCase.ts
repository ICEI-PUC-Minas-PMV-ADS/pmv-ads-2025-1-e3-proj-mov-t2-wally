import { UsuariosRepositorio } from '../../repositorios/UsuariosRepositorio'
import { TransacoesRepositorio } from '../../repositorios/TransacoesRepositorio'
import { Transacao } from '../../entity/Transacao'

interface GetUsuarioBalancoUseCaseParams {
  usuario_id: string
  data_inicial: Date
  data_final: Date
}

interface GetUsuarioBalancoUseCaseResponse {
  saldo: number
  totalReceitas: number
  totalDespesas: number
  transacoes: Transacao[]
}
export class GetUsuarioBalancoUseCase {
  constructor(
    private readonly transacoesRepositorio: TransacoesRepositorio,
    private readonly usuariosRepositorio: UsuariosRepositorio,
  ) {}

  async execute({
    usuario_id,
    data_inicial,
    data_final,
  }: GetUsuarioBalancoUseCaseParams): Promise<GetUsuarioBalancoUseCaseResponse> {
    const usuario = await this.usuariosRepositorio.findById(usuario_id)

    if (!usuario) {
      return {
        saldo: 0,
        totalReceitas: 0,
        totalDespesas: 0,
        transacoes: [],
      }
    }

    const receitas =
      await this.transacoesRepositorio.findAllByUsuarioIdFromInterval({
        usuario_id,
        data_inicial,
        data_final,
        tipo: 'RECEITA',
      })

    const despesas =
      await this.transacoesRepositorio.findAllByUsuarioIdFromInterval({
        usuario_id,
        data_inicial,
        data_final,
        tipo: 'DESPESA',
      })

    const totalReceitas = receitas.reduce(
      (acc, transacao) => acc + Number(transacao.valor),
      0,
    )
    const totalDespesas = despesas.reduce(
      (acc, transacao) => acc + Number(transacao.valor),
      0,
    )

    const saldo = totalReceitas - totalDespesas

    const transacoes = [...receitas, ...despesas]

    return { saldo, totalReceitas, totalDespesas, transacoes }
  }
}
