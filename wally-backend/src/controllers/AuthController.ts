import { FastifyReply, FastifyRequest } from 'fastify'
import { UsuariosRepositorio } from '../repositorios/UsuariosRepositorio'
import { SignInUseCase } from '../use-cases/auth/SignInUseCase'
import { SignUpUseCase } from '../use-cases/auth/SignUpUseCase'
import { ForgotPasswordUseCase } from '../use-cases/auth/ForgotPasswordUseCase'
import { ResetPasswordUseCase } from '../use-cases/auth/ResetPasswordUseCase'

const usuariosRepositorio = new UsuariosRepositorio()

export class AuthController {
  async signIn(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, senha } = request.body as {
        email: string
        senha: string
      }

      console.log({ email, senha })

      const signInUseCase = new SignInUseCase(usuariosRepositorio)

      const { success, auth, error } = await signInUseCase.execute(email, senha)

      if (!success) {
        return reply
          .status(401)
          .send({ message: 'E-mail ou senha inválidos(s)', error })
      }

      return reply.status(200).send(auth)
    } catch (error) {
      return reply.status(500).send({
        message: 'Erro interno do servidor',
        error,
      })
    }
  }

  async signUp(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, senha, nome, telefone, dataNascimento } = request.body as {
        email: string
        senha: string
        nome: string
        telefone: string
        dataNascimento: string
      }

      const signUpUseCase = new SignUpUseCase(usuariosRepositorio)

      const { success, usuario, error } = await signUpUseCase.execute({
        email,
        senha,
        nome,
        telefone,
        dataNascimento,
      })

      if (!success) {
        return reply
          .status(400)
          .send({ message: 'Erro ao criar usuário', error })
      }

      return reply.status(201).send(usuario)
    } catch (error) {
      console.log({ error })

      return reply
        .status(500)
        .send({ message: 'Erro interno do servidor', error })
    }
  }

  async forgotPassword(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email } = request.body as { email: string }

      const forgotPasswordUseCase = new ForgotPasswordUseCase(
        usuariosRepositorio,
      )

      const { success, url, error } = await forgotPasswordUseCase.execute(email)

      if (!success) {
        return reply
          .status(400)
          .send({ message: 'Erro ao enviar e-mail', error })
      }

      return reply.status(200).send({ message: 'E-mail enviado', url })
    } catch (error) {
      return reply
        .status(500)
        .send({ message: 'Erro interno do servidor', error })
    }
  }

  async resetPassword(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { token, senha } = request.body as { token: string; senha: string }

      const resetPasswordUseCase = new ResetPasswordUseCase(usuariosRepositorio)

      const { success, error } = await resetPasswordUseCase.execute(
        token,
        senha,
      )

      if (!success) {
        return reply
          .status(400)
          .send({ message: 'Erro ao redefinir senha', error })
      }

      return reply.status(200).send({ message: 'Senha redefinida com sucesso' })
    } catch (error) {
      console.log({ error })

      return reply
        .status(500)
        .send({ message: 'Erro interno do servidor', error })
    }
  }
}
