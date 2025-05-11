import { FastifyInstance } from 'fastify'
import { UsuarioStatusController } from '../controllers/UsuarioStatusController'
import { authMiddleware } from '../middleware'
import { GrupoStatusController } from '../controllers/GrupoStatusController'

const usuarioStatusController = new UsuarioStatusController()
const grupoStatusController = new GrupoStatusController()

export const statusRoutes = async (app: FastifyInstance) => {
  app.get(
    '/status/balanco',
    { preHandler: authMiddleware },
    usuarioStatusController.getBalancoUsuario,
  )

  app.get(
    '/status/grupo',
    { preHandler: authMiddleware },
    grupoStatusController.getGrupoBalanco,
  )
}
