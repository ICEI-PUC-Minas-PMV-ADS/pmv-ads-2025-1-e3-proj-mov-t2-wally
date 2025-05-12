import { Transacao } from '../../entity/Transacao'
import { TransacoesRepositorio } from '../../repositorios/TransacoesRepositorio'
import { UsuariosRepositorio } from '../../repositorios/UsuariosRepositorio'

interface CriarTransacaoUsuarioUseCaseParams {
  nome: string
  valor: number
  usuario_id: string
  data: Date
  tipo: 'RECEITA' | 'DESPESA'
}

interface CriarTransacaoUsuarioUseCaseResponse {
  success: boolean
  transacao: Transacao | null
  error: string | null
}

export class CriarTransacaoUsuarioUseCase {
  constructor(
    private readonly transacoesRepositorio: TransacoesRepositorio,
    private readonly usuariosRepositorio: UsuariosRepositorio,
  ) {}

  async execute({
    nome,
    valor,
    usuario_id,
    data,
    tipo,
  }: CriarTransacaoUsuarioUseCaseParams): Promise<CriarTransacaoUsuarioUseCaseResponse> {
    const usuario = await this.usuariosRepositorio.findById(usuario_id)

    if (!usuario) {
      return {
        success: false,
        transacao: null,
        error: 'Usuário não encontrado',
      }
    }

    const transacao = await this.transacoesRepositorio.create({
      tipo,
      valor,
      usuario_id,
      data,
      nome,
    })

    return { success: true, transacao, error: null }
  }
}
