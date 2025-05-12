import { UsuariosRepositorio } from '../../repositorios/UsuariosRepositorio'

interface CriarUsuarioUseCaseParams {
  nome: string
  email: string
  senha: string
  confirmacao_senha: string
  telefone: string
  data_nascimento: string
}

export class CriarUsuarioUseCase {
  constructor(private readonly usuariosRepositorio: UsuariosRepositorio) {}

  async execute({
    nome,
    email,
    senha,
    confirmacao_senha,
    telefone,
    data_nascimento,
  }: CriarUsuarioUseCaseParams) {
    if (senha !== confirmacao_senha) {
      return {
        success: false,
        usuario: null,
        error: 'As senhas não coincidem',
      }
    }

    const usuarioExistente = await this.usuariosRepositorio.findByEmail(email)

    if (usuarioExistente) {
      return {
        success: false,
        usuario: null,
        error: 'E-mail já cadastrado',
      }
    }

    const usuario = await this.usuariosRepositorio.create({
      nome,
      email,
      senha,
      telefone,
      data_nascimento,
    })

    return {
      success: true,
      usuario,
      error: null,
    }
  }
}
