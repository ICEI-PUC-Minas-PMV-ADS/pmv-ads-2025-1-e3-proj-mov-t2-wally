import { UsuariosRepositorio } from '../../repositorios/UsuariosRepositorio'
import * as jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret'

export class ForgotPasswordUseCase {
  constructor(private readonly usuariosRepositorio: UsuariosRepositorio) {}

  async execute(email: string) {
    const usuario = await this.usuariosRepositorio.findByEmail(email)

    if (!usuario) {
      return {
        success: false,
        usuario: null,
        error: 'Usuário não encontrado',
      }
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, {
      expiresIn: '24h',
    })

    const url = `http://localhost:3000/reset-password?token=${token}`

    // const emailService = new EmailService()

    // await emailService.sendEmail(usuario.email, 'Redefinir senha Wally', url)

    return {
      success: true,
      usuario,
      token,
      url,
    }
  }
}
