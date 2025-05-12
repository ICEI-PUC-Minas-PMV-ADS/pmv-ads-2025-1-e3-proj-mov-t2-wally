import { UsuariosRepositorio } from '../../repositorios/UsuariosRepositorio'
import * as jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'secret'

export class ResetPasswordUseCase {
  constructor(private readonly usuariosRepositorio: UsuariosRepositorio) {}

  async execute(token: string, senha: string) {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (!decoded) {
      return {
        success: false,
        usuario: null,
        error: 'Token inválido',
      }
    }

    const usuario_id = (decoded as { id: string }).id

    const usuario = await this.usuariosRepositorio.findById(usuario_id)

    if (!usuario) {
      return {
        success: false,
        usuario: null,
        error: 'Usuário não encontrado',
      }
    }

    usuario.senha = senha

    await this.usuariosRepositorio.update(usuario)

    return {
      success: true,
      usuario,
      error: null,
    }
  }
}
