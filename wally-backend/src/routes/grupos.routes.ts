import { FastifyInstance } from 'fastify'
import { GruposController } from '../controllers/GruposController'
import { authMiddleware } from '../middleware'

const gruposController = new GruposController()

const findAllByUsuarioIdSchema = {
  tags: ['grupos'],
  summary: 'Listar grupos do usuário',
  description: 'Retorna uma lista de todos os grupos que o usuário participa',
  security: [{ bearerAuth: [] }],
  querystring: {
    type: 'object',
    required: ['usuario_id'],
    properties: {
      usuario_id: { type: 'string', description: 'ID do usuário' },
    },
  },
  response: {
    200: {
      description: 'Lista de grupos retornada com sucesso',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID único do grupo' },
          nome: { type: 'string', description: 'Nome do grupo' },
          descricao: { type: 'string', description: 'Descrição do grupo' },
          avatar_url: { type: 'string', description: 'URL do avatar do grupo' },
          membros: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', description: 'ID do membro' },
                nome: { type: 'string', description: 'Nome do membro' },
                email: { type: 'string', description: 'E-mail do membro' },
                avatar_url: {
                  type: 'string',
                  description: 'URL do avatar do membro',
                },
              },
            },
          },
        },
      },
    },
    401: {
      description: 'Não autorizado',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de erro' },
      },
    },
  },
}

const createGrupoSchema = {
  tags: ['grupos'],
  summary: 'Criar novo grupo',
  description:
    'Cria um novo grupo no sistema (o usuário autenticado será o administrador)',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    required: ['nome', 'descricao', 'avatar_url', 'membros'],
    properties: {
      nome: { type: 'string', description: 'Nome do grupo' },
      descricao: { type: 'string', description: 'Descrição do grupo' },
      avatar_url: { type: 'string', description: 'URL do avatar do grupo' },
      membros: {
        type: 'array',
        items: { type: 'string' },
        description: 'Lista de IDs dos membros do grupo',
      },
    },
  },
  response: {
    201: {
      description: 'Grupo criado com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID único do grupo' },
        nome: { type: 'string', description: 'Nome do grupo' },
        descricao: { type: 'string', description: 'Descrição do grupo' },
        avatar_url: { type: 'string', description: 'URL do avatar do grupo' },
        membros: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'ID do membro' },
              nome: { type: 'string', description: 'Nome do membro' },
              email: { type: 'string', description: 'E-mail do membro' },
              avatar_url: {
                type: 'string',
                description: 'URL do avatar do membro',
              },
            },
          },
        },
      },
    },
    400: {
      description: 'Erro na criação do grupo',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de erro' },
        error: { type: 'string', description: 'Detalhes do erro' },
      },
    },
  },
}

export async function gruposRoutes(app: FastifyInstance) {
  app.get(
    '/grupos',
    { schema: findAllByUsuarioIdSchema, preHandler: authMiddleware },
    gruposController.findAllByUsuarioId,
  )
  app.post(
    '/grupos',
    { schema: createGrupoSchema, preHandler: authMiddleware },
    gruposController.create,
  )
}
