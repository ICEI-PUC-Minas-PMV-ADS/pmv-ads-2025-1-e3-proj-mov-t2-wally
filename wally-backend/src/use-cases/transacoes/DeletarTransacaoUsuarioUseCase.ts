import { TransacoesRepositorio } from 'repositorios/TransacoesRepositorio'

export class DeletarTransacaoUsuarioUseCase {
  constructor(private transacoesRepositorio: TransacoesRepositorio) {}

  async execute(id: string) {
    await this.transacoesRepositorio.delete(id)

    return { success: true, error: null, transacao: null }
  }
}
