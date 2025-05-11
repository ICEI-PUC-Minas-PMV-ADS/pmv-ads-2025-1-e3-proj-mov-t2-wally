import { FastifyInstance } from 'fastify'
import { authMiddleware } from '../middleware'
import { TransacoesController } from '../controllers/TransacoesController'

const transacoesController = new TransacoesController()

export async function transacoesRoutes(app: FastifyInstance) {
  app.get(
    '/transacoes',
    { preHandler: authMiddleware },
    transacoesController.get,
  )

  app.post(
    '/transacoes',
    { preHandler: authMiddleware },
    transacoesController.create,
  )
}
