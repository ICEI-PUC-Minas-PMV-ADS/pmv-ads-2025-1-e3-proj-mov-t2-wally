import { FastifyInstance } from 'fastify'
import { UsuariosController } from '../controllers/UsuariosController'
import { authMiddleware } from '../middleware'

const usuariosController = new UsuariosController()

export async function usuariosRoutes(app: FastifyInstance) {
  app.get(
    '/usuarios',
    { preHandler: authMiddleware },
    usuariosController.findAll,
  )

  app.get(
    '/usuarios/:email',
    { preHandler: authMiddleware },
    usuariosController.findByEmail,
  )

  app.post(
    '/usuarios',
    { preHandler: authMiddleware },
    usuariosController.create,
  )

  app.put(
    '/usuarios/:id',
    { preHandler: authMiddleware },
    usuariosController.update,
  )

  app.delete(
    '/usuarios/:id',
    { preHandler: authMiddleware },
    usuariosController.delete,
  )
}
