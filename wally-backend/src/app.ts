import 'dotenv/config'
import fastify from 'fastify'
import 'reflect-metadata'
import { AppDataSource } from './data-source'
import { routes } from './routes'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

const server = fastify({
  logger: true,
})

// Swagger configuration
server.register(swagger, {
  swagger: {
    info: {
      title: 'API Wally',
      description:
        'Documentação da API do aplicativo Wally - Sistema de gerenciamento de despesas compartilhadas',
      version: '1.0.0',
    },
    host: 'localhost:3333',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'auth', description: 'Endpoints de autenticação' },
      {
        name: 'usuarios',
        description: 'Endpoints de gerenciamento de usuários',
      },
      { name: 'transacoes', description: 'Endpoints de transações' },
      { name: 'grupos', description: 'Endpoints de gerenciamento de grupos' },
      { name: 'status', description: 'Endpoints de status e saldo' },
      { name: 'pagamentos', description: 'Endpoints de pagamentos' },
      {
        name: 'despesas-grupos',
        description: 'Endpoints de despesas em grupo',
      },
    ],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Token de autenticação JWT (Bearer token)',
      },
    },
  },
})

server.register(swaggerUi, {
  routePrefix: '/wally/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
})

server.register(cors, {
  origin: '*',
})

server.register(routes, { prefix: '/wally' })

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  AppDataSource.initialize()
    .then(() => {
      console.log('Database connected')
    })
    .catch((error) => console.log(error))

  console.log('Server HTTP is running on port 3333')
})
