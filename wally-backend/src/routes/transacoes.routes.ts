import { FastifyInstance } from 'fastify'
import { authMiddleware } from '../middleware'
import { TransacoesController } from '../controllers/TransacoesController'

const transacoesController = new TransacoesController()

const getTransacoesSchema = {
  tags: ['transacoes'],
  summary: 'Listar transações',
  description: 'Retorna a lista de transações do usuário autenticado',
  security: [{ bearerAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      tipo: {
        type: 'string',
        enum: ['RECEITA', 'DESPESA'],
        description: 'Tipo da transação (opcional)',
      },
      data_inicial: {
        type: 'string',
        format: 'date',
        description: 'Data inicial do período (YYYY-MM-DD) (opcional)',
      },
      data_final: {
        type: 'string',
        format: 'date',
        description: 'Data final do período (YYYY-MM-DD) (opcional)',
      },
    },
  },
  response: {
    200: {
      description: 'Lista de transações retornada com sucesso',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID único da transação' },
          nome: { type: 'string', description: 'Nome da transação' },
          valor: { type: 'number', description: 'Valor da transação' },
          tipo: {
            type: 'string',
            enum: ['RECEITA', 'DESPESA'],
            description: 'Tipo da transação',
          },
          data: {
            type: 'string',
            format: 'date-time',
            description: 'Data da transação',
          },
          usuario_id: { type: 'string', description: 'ID do usuário' },
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

const createTransacaoSchema = {
  tags: ['transacoes'],
  summary: 'Criar transação',
  description: 'Cria uma nova transação para o usuário',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    required: ['nome', 'valor', 'tipo', 'data'],
    properties: {
      nome: { type: 'string', description: 'Nome da transação' },
      valor: { type: 'number', description: 'Valor da transação' },
      tipo: {
        type: 'string',
        enum: ['RECEITA', 'DESPESA'],
        description: 'Tipo da transação',
      },
      data: {
        type: 'string',
        format: 'date-time',
        description: 'Data da transação',
      },
    },
  },
  response: {
    201: {
      description: 'Transação criada com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID único da transação' },
        nome: { type: 'string', description: 'Nome da transação' },
        valor: { type: 'number', description: 'Valor da transação' },
        tipo: {
          type: 'string',
          enum: ['RECEITA', 'DESPESA'],
          description: 'Tipo da transação',
        },
        data: {
          type: 'string',
          format: 'date-time',
          description: 'Data da transação',
        },
        usuario_id: { type: 'string', description: 'ID do usuário' },
      },
    },
    400: {
      description: 'Erro ao criar transação',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de erro' },
        error: { type: 'string', description: 'Detalhes do erro' },
      },
    },
  },
}

export async function transacoesRoutes(app: FastifyInstance) {
  app.get(
    '/transacoes',
    { schema: getTransacoesSchema, preHandler: authMiddleware },
    transacoesController.get,
  )
  app.post(
    '/transacoes',
    { schema: createTransacaoSchema, preHandler: authMiddleware },
    transacoesController.create,
  )

  app.delete(
    '/transacoes',
    { preHandler: authMiddleware },
    transacoesController.delete,
  )
}
