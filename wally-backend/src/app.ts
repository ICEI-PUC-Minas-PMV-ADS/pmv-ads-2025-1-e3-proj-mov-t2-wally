import 'dotenv/config'
import fastify from 'fastify'
import 'reflect-metadata'
import { AppDataSource } from './data-source'
import { routes } from './routes'
import cors from '@fastify/cors'

const server = fastify({
  logger: true,
})

server.register(cors, {
  origin: '*',
})

server.register(routes, { prefix: '/wally' })

server.listen({ port: 3333 }).then(() => {
  AppDataSource.initialize()
    .then(() => {
      console.log('Database connected')
    })
    .catch((error) => console.log(error))

  console.log('Server HTTP is running on port 3333')
})
