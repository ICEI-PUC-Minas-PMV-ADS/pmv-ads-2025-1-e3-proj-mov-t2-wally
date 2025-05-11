import { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/AuthController'

const authController = new AuthController()

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-in', authController.signIn)

  app.post('/sign-up', authController.signUp)

  app.post('/forgot-password', authController.forgotPassword)

  app.post('/reset-password', authController.resetPassword)
}
