import { Usuario } from '../../entity/Usuario'
import { UsuariosRepositorio } from '../../repositorios/UsuariosRepositorio'

interface SignUpUseCaseParams {
  email: string
  senha: string
  nome: string
  telefone?: string
  dataNascimento?: string
  avatarUrl?: string
}

interface SignUpUseCaseResponse {
  success: boolean
  usuario: Usuario
  error: string | null
}

export class SignUpUseCase {
  constructor(private readonly usuariosRepositorio: UsuariosRepositorio) {}

  async execute({
    email,
    senha,
    nome,
    telefone,
    dataNascimento,
    avatarUrl,
  }: SignUpUseCaseParams): Promise<SignUpUseCaseResponse> {
    const usuarioExistente = await this.usuariosRepositorio.findByEmail(email)

    if (usuarioExistente) {
      return {
        success: false,
        usuario: null,
        error: 'E-mail já cadastrado',
      }
    }

    const usuario = await this.usuariosRepositorio.create({
      email,
      senha,
      nome,
      telefone,
      data_nascimento: dataNascimento,
      avatar_url: avatarUrl,
    })

    return {
      success: true,
      usuario,
      error: null,
    }
  }
}
