import { FastifyRequest, FastifyReply } from 'fastify'
import { CriarUsuarioUseCase } from '../use-cases/usuarios/CriarUsuarioUseCase'
import { UsuariosRepositorio } from '../repositorios/UsuariosRepositorio'

const usuariosRepositorio = new UsuariosRepositorio()

export class UsuariosController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const {
        nome,
        email,
        senha,
        confirmacao_senha,
        telefone,
        data_nascimento,
      } = request.body as {
        nome: string
        email: string
        senha: string
        confirmacao_senha: string
        telefone: string
        data_nascimento: string
      }

      const criarUsuarioUseCase = new CriarUsuarioUseCase(usuariosRepositorio)

      const { success, usuario, error } = await criarUsuarioUseCase.execute({
        nome,
        email,
        senha,
        confirmacao_senha,
        telefone,
        data_nascimento,
      })

      if (!success) {
        return reply
          .status(400)
          .send({ message: 'Erro ao criar usuário', error })
      }

      return reply.status(201).send(usuario)
    } catch (error) {
      return reply.status(500).send({
        message: 'Erro interno do servidor',
        error,
      })
    }
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const usuarios = await usuariosRepositorio.findAll()

      return reply.status(200).send(usuarios)
    } catch (error) {
      return reply.status(500).send({
        message: 'Erro ao buscar usuários',
        error,
      })
    }
  }

  async findByEmail(request: FastifyRequest, reply: FastifyReply) {
    const { email } = request.params as { email: string }

    const usuario = await usuariosRepositorio.findByEmail(email)

    return reply.status(200).send(usuario)
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    const usuario = await usuariosRepositorio.findById(id)

    return reply.status(200).send(usuario)
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    const { nome, email } = request.body as {
      nome: string
      email: string
    }

    const usuario = await usuariosRepositorio.findById(id)

    if (!usuario) {
      return reply.status(404).send({ message: 'Usuário não encontrado' })
    }

    usuario.nome = nome
    usuario.email = email

    const usuarioAtualizado = await usuariosRepositorio.update(usuario)

    return reply.status(200).send(usuarioAtualizado)
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    const usuario = await usuariosRepositorio.findById(id)

    if (!usuario) {
      return reply.status(404).send({ message: 'Usuário não encontrado' })
    }

    await usuariosRepositorio.delete(usuario)

    return reply.status(200).send({ message: 'Usuário deletado com sucesso' })
  }
}
