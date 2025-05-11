import { FastifyInstance } from 'fastify'
import { GruposController } from '../controllers/GruposController'
import { authMiddleware } from '../middleware'

const gruposController = new GruposController()

export async function gruposRoutes(app: FastifyInstance) {
  app.get(
    '/grupos',
    { preHandler: authMiddleware },
    gruposController.findAllByUsuarioId,
  )

  app.post('/grupos', { preHandler: authMiddleware }, gruposController.create)
}
