import { UsuariosRepositorio } from '../../repositorios/UsuariosRepositorio'
import * as jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret'

export class SignInUseCase {
  constructor(private readonly usuariosRepositorio: UsuariosRepositorio) {}

  async execute(email: string, senha: string) {
    const usuario = await this.usuariosRepositorio.findByEmail(email)

    if (!usuario) {
      return {
        success: false,
        usuario: null,
        error: 'E-mail ou senha inválidos(s)',
      }
    }

    const senhaCorreta = senha === usuario.senha

    if (!senhaCorreta) {
      return {
        success: false,
        usuario: null,
        error: 'E-mail ou senha inválidos(s)',
      }
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, {
      expiresIn: '24h',
    })

    return {
      success: true,
      auth: {
        usuario,
        token,
      },
      error: null,
    }
  }
}
