import { TransacoesRepositorio } from '../repositorios/TransacoesRepositorio'
import { UsuariosRepositorio } from '../repositorios/UsuariosRepositorio'
import { FastifyRequest, FastifyReply } from 'fastify'
import { GetTransacoesUsuarioUseCase } from '../use-cases/transacoes/GetTransacoesUsuarioUseCase'
import { CriarTransacaoUsuarioUseCase } from '../use-cases/transacoes/CriarTransacaoUsuarioUseCase'

const transacoesRepositorio = new TransacoesRepositorio()
const usuariosRepositorio = new UsuariosRepositorio()

export class TransacoesController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const criarTransacaoUsuario = new CriarTransacaoUsuarioUseCase(
        transacoesRepositorio,
        usuariosRepositorio,
      )

      const usuario_id = request.usuario_id.id

      const { nome, valor, tipo, data } = request.body as {
        nome: string
        valor: number
        tipo: 'RECEITA' | 'DESPESA'
        data: Date
      }

      console.log({ nome, valor, tipo, data, usuario_id })

      const { success, transacao, error } = await criarTransacaoUsuario.execute(
        {
          nome,
          valor,
          tipo,
          usuario_id,
          data,
        },
      )

      if (!success) {
        return reply
          .status(400)
          .send({ message: 'Erro ao criar transação', error })
      }

      return reply.status(201).send(transacao)
    } catch (error) {
      console.log(error)
      return reply
        .status(500)
        .send({ message: 'Erro ao criar transação', error })
    }
  }

  async get(request: FastifyRequest, reply: FastifyReply) {
    try {
      const usuario_id = request.usuario_id

      const { tipo, data_inicial, data_final } = request.query as {
        usuario_id: string
        tipo: string
        data_inicial: string
        data_final: string
      }

      const getTransacoesUsuario = new GetTransacoesUsuarioUseCase(
        transacoesRepositorio,
      )

      const { success, transacoes, error } = await getTransacoesUsuario.execute(
        {
          usuario_id,
          tipo,
          data_inicial,
          data_final,
        },
      )

      if (!success) {
        return reply
          .status(400)
          .send({ message: 'Erro ao buscar transações', error })
      }

      return reply.status(200).send(transacoes)
    } catch (error) {
      return reply.status(500).send({
        message: 'Erro ao buscar transações',
        error,
      })
    }
  }
}
