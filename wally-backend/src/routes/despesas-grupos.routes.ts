import { FastifyInstance } from 'fastify'
import { DespesasGruposController } from '../controllers/DespesasGruposController'
import { authMiddleware } from '../middleware'
const despesasGruposController = new DespesasGruposController()

export async function despesasGruposRoutes(app: FastifyInstance) {
  app.get(
    '/despesas-grupo',
    { preHandler: authMiddleware },
    despesasGruposController.getDespesasGrupos,
  )

  app.post(
    '/despesas-grupo',
    { preHandler: authMiddleware },
    despesasGruposController.createDespesaGrupo,
  )
}
