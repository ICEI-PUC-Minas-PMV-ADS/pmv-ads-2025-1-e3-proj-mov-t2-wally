import { FastifyRequest, FastifyReply } from 'fastify'
import * as jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply
      .status(401)
      .send({ message: 'Authorization header missing or invalid' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    request.usuario_id = decoded as string
  } catch (error) {
    reply.status(401).send({
      message: 'Invalid or expired token',
      error: JSON.stringify(error),
    })
  }
}
