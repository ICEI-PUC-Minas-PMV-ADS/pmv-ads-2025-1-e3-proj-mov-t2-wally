import { FastifyInstance } from 'fastify'
import { UsuariosController } from '../controllers/UsuariosController'
import { authMiddleware } from '../middleware'

const usuariosController = new UsuariosController()

export async function usuariosRoutes(app: FastifyInstance) {
  app.get('/users', { preHandler: authMiddleware }, usuariosController.findAll)

  app.get(
    '/users/:email',
    { preHandler: authMiddleware },
    usuariosController.findByEmail,
  )

  app.post('/users', { preHandler: authMiddleware }, usuariosController.create)

  app.put(
    '/users/:id',
    { preHandler: authMiddleware },
    usuariosController.update,
  )

  app.delete(
    '/users/:id',
    { preHandler: authMiddleware },
    usuariosController.delete,
  )
}
