import { FastifyRequest, FastifyReply } from 'fastify'
import { PagamentosDespesasRepositorio } from '../repositorios/PagamentosDespesasRepositorio'

const pagamentosDespesasRepositorio = new PagamentosDespesasRepositorio()

export class PagamentosDespesasController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { valor, despesa_id } = request.body as {
        valor: number
        despesa_id: string
      }

      const pagamento = await pagamentosDespesasRepositorio.create(
        despesa_id,
        valor,
      )

      return reply.status(201).send(pagamento)
    } catch (error) {
      return reply
        .status(500)
        .send({ message: 'Erro ao criar pagamento', error })
    }
  }

  async findByDespesaId(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { despesa_id } = request.params as {
        despesa_id: string
      }

      const pagamentos =
        await pagamentosDespesasRepositorio.findByDespesaId(despesa_id)

      return reply.status(200).send(pagamentos)
    } catch (error) {
      return reply
        .status(500)
        .send({ message: 'Erro ao buscar pagamentos', error })
    }
  }
}
