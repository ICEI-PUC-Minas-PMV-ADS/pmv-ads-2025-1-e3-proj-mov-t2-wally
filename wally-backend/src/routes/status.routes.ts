import { FastifyInstance } from 'fastify'
import { UsuarioStatusController } from '../controllers/UsuarioStatusController'
import { authMiddleware } from '../middleware'
import { GrupoStatusController } from '../controllers/GrupoStatusController'

const usuarioStatusController = new UsuarioStatusController()
const grupoStatusController = new GrupoStatusController()

const getBalancoUsuarioSchema = {
  tags: ['status'],
  summary: 'Obter balanço do usuário',
  description: 'Retorna o balanço financeiro do usuário em um período',
  security: [{ bearerAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      usuario_id: {
        type: 'string',
        description:
          'ID do usuário (opcional, se não informado usa o usuário do token)',
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
      description: 'Balanço retornado com sucesso',
      type: 'object',
      properties: {
        saldo: {
          type: 'number',
          description: 'Saldo final (receitas - despesas)',
        },
        totalReceitas: {
          type: 'number',
          description: 'Total de receitas no período',
        },
        totalDespesas: {
          type: 'number',
          description: 'Total de despesas no período',
        },
        transacoes: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              nome: { type: 'string' },
              valor: { type: 'number' },
              tipo: { type: 'string', enum: ['RECEITA', 'DESPESA'] },
              data: { type: 'string', format: 'date-time' },
              usuario_id: { type: 'string' },
            },
          },
        },
      },
    },
    500: {
      description: 'Erro ao buscar status do usuário',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de erro' },
        error: { type: 'string', description: 'Detalhes do erro' },
      },
    },
  },
}

const getGrupoBalancoSchema = {
  tags: ['status'],
  summary: 'Obter balanço do grupo',
  description: 'Retorna o balanço financeiro de um grupo',
  security: [{ bearerAuth: [] }],
  querystring: {
    type: 'object',
    required: ['grupo_id', 'usuario_id'],
    properties: {
      grupo_id: {
        type: 'string',
        description: 'ID do grupo',
      },
      usuario_id: {
        type: 'string',
        description: 'ID do usuário',
      },
    },
  },
  response: {
    200: {
      description: 'Balanço do grupo retornado com sucesso',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          nome: { type: 'string', description: 'Nome da transação' },
          usuario_id: { type: 'string', description: 'ID do usuário' },
          valor_total: {
            type: 'number',
            description: 'Valor total da transação',
          },
          valor_pego_emprestado: {
            type: ['number', 'null'],
            description:
              'Valor pego emprestado pelo usuário (null se não envolvido ou se emprestou)',
          },
          data: {
            type: 'string',
            format: 'date-time',
            description: 'Data da transação',
          },
          envolvido: {
            type: 'boolean',
            description: 'Se o usuário está envolvido na transação',
          },
          emprestou: {
            type: 'boolean',
            description: 'Se o usuário emprestou o dinheiro',
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

export const statusRoutes = async (app: FastifyInstance) => {
  app.get(
    '/status/balanco',
    { schema: getBalancoUsuarioSchema, preHandler: authMiddleware },
    usuarioStatusController.getBalancoUsuario,
  )
  app.get(
    '/status/grupo',
    { preHandler: authMiddleware },
    grupoStatusController.getGrupoBalanco,
  )
}
