import { FastifyInstance } from 'fastify'
import { PagamentosDespesasController } from '../controllers/PagamentosDespesasController'
import { authMiddleware } from '../middleware'

const pagamentosDespesasController = new PagamentosDespesasController()

const createPagamentoSchema = {
  tags: ['pagamentos'],
  summary: 'Registrar pagamento',
  description: 'Registra um novo pagamento para uma despesa',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    required: ['valor', 'despesa_id'],
    properties: {
      valor: {
        type: 'number',
        description: 'Valor do pagamento',
      },
      despesa_id: {
        type: 'string',
        description: 'ID da despesa',
      },
    },
  },
  response: {
    201: {
      description: 'Pagamento registrado com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID do pagamento' },
        valor: { type: 'number', description: 'Valor do pagamento' },
        despesa_id: { type: 'string', description: 'ID da despesa' },
        usuario_id: {
          type: 'string',
          description: 'ID do usuário que fez o pagamento',
        },
        data_pagamento: {
          type: 'string',
          format: 'date-time',
          description: 'Data e hora do pagamento',
        },
      },
    },
    400: {
      description: 'Erro ao registrar pagamento',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de erro' },
      },
    },
  },
}

const findByDespesaIdSchema = {
  tags: ['pagamentos'],
  summary: 'Listar pagamentos da despesa',
  description:
    'Retorna uma lista de todos os pagamentos registrados para uma despesa específica',
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    required: ['despesa_id'],
    properties: {
      despesa_id: {
        type: 'string',
        description: 'ID da despesa',
      },
    },
  },
  response: {
    200: {
      description: 'Lista de pagamentos retornada com sucesso',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID do pagamento' },
          valor: { type: 'number', description: 'Valor do pagamento' },
          despesa_id: { type: 'string', description: 'ID da despesa' },
          usuario_id: {
            type: 'string',
            description: 'ID do usuário que fez o pagamento',
          },
          data_pagamento: {
            type: 'string',
            format: 'date-time',
            description: 'Data e hora do pagamento',
          },
          usuario: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'ID do usuário' },
              nome: { type: 'string', description: 'Nome do usuário' },
              email: { type: 'string', description: 'E-mail do usuário' },
              avatar_url: {
                type: 'string',
                description: 'URL do avatar do usuário',
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

export async function pagamentosRoutes(app: FastifyInstance) {
  app.post(
    '/pagamentos',
    { schema: createPagamentoSchema, preHandler: authMiddleware },
    pagamentosDespesasController.create,
  )
  app.get(
    '/pagamentos/:despesa_id',
    { schema: findByDespesaIdSchema, preHandler: authMiddleware },
    pagamentosDespesasController.findByDespesaId,
  )
}
