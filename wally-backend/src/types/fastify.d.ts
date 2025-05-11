// Make this file a module
import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    usuario_id?: string
  }
}
