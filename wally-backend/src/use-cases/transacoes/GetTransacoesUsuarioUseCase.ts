import { Transacao } from '../../entity/Transacao'
import { TransacoesRepositorio } from '../../repositorios/TransacoesRepositorio'

interface GetTransacoesUsuarioUseCaseParams {
  usuario_id: string
  tipo?: string
  data_inicial?: string
  data_final?: string
}

interface GetTransacoesUsuarioUseCaseResponse {
  success: boolean
  transacoes: Transacao[]
  error: string | null
}

export class GetTransacoesUsuarioUseCase {
  constructor(private readonly transacoesRepositorio: TransacoesRepositorio) {}

  async execute({
    usuario_id,
    tipo,
    data_inicial,
    data_final,
  }: GetTransacoesUsuarioUseCaseParams): Promise<GetTransacoesUsuarioUseCaseResponse> {
    if (!usuario_id) {
      return {
        success: false,
        transacoes: [],
        error: 'Erro ao buscar transações, usuário não encontrado',
      }
    }

    const params = {
      ...(usuario_id && { usuario_id }),
      ...(tipo && { tipo }),
      ...(data_inicial && { data_inicial: new Date(data_inicial) }),
      ...(data_final && { data_final: new Date(data_final) }),
    }

    const transacoes =
      await this.transacoesRepositorio.findAllByUsuarioIdFromInterval(params)

    return {
      success: true,
      transacoes,
      error: null,
    }
  }
}
