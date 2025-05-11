import { FastifyInstance } from 'fastify'
import { PagamentosDespesasController } from '../controllers/PagamentosDespesasController'
import { authMiddleware } from '../middleware'
const pagamentosDespesasController = new PagamentosDespesasController()

export async function pagamentosRoutes(app: FastifyInstance) {
  app.post(
    '/pagamentos',
    { preHandler: authMiddleware },
    pagamentosDespesasController.create,
  )
  app.get(
    '/pagamentos/:despesa_id',
    { preHandler: authMiddleware },
    pagamentosDespesasController.findByDespesaId,
  )
}
