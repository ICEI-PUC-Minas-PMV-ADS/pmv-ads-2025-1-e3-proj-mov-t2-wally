import { Usuario } from '../../entity/Usuario'
import { UsuariosRepositorio } from '../../repositorios/UsuariosRepositorio'

interface SignUpUseCaseParams {
  email: string
  senha: string
  nome: string
  avatar_url: string
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
    avatar_url,
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
      avatar_url,
    })

    return {
      success: true,
      usuario,
      error: null,
    }
  }
}
