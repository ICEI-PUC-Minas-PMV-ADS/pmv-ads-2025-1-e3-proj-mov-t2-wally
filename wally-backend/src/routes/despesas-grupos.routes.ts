import { FastifyInstance } from 'fastify'
import { DespesasGruposController } from '../controllers/DespesasGruposController'
import { authMiddleware } from '../middleware'

const despesasGruposController = new DespesasGruposController()

const getDespesasGruposSchema = {
  tags: ['despesas-grupos'],
  summary: 'Listar despesas do grupo',
  description: 'Retorna todas as despesas de um grupo',
  security: [{ bearerAuth: [] }],
  querystring: {
    type: 'object',
    required: ['grupo_id'],
    properties: {
      grupo_id: { type: 'string', description: 'ID do grupo' },
    },
  },
  response: {
    200: {
      description: 'Lista de despesas retornada com sucesso',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID único da despesa' },
          nome: { type: 'string', description: 'Nome da despesa' },
          valor: { type: 'number', description: 'Valor total da despesa' },
          grupo_id: { type: 'string', description: 'ID do grupo' },
          criado_por: {
            type: 'string',
            description: 'ID do usuário que criou a despesa',
          },
          data_criacao: {
            type: 'string',
            format: 'date-time',
            description: 'Data de criação da despesa',
          },
          pagamentos: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', description: 'ID do pagamento' },
                valor: { type: 'number', description: 'Valor do pagamento' },
                usuario_id: {
                  type: 'string',
                  description: 'ID do usuário que fez o pagamento',
                },
                data_pagamento: {
                  type: 'string',
                  format: 'date-time',
                  description: 'Data do pagamento',
                },
                usuario: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', description: 'ID do usuário' },
                    nome: { type: 'string', description: 'Nome do usuário' },
                    email: { type: 'string', description: 'E-mail do usuário' },
                  },
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

const createDespesaGrupoSchema = {
  tags: ['despesas-grupos'],
  summary: 'Criar despesa em grupo',
  description:
    'Cria uma nova despesa para um grupo (o usuário autenticado será o criador)',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    required: ['nome', 'valor', 'grupo_id', 'membros_participantes'],
    properties: {
      nome: { type: 'string', description: 'Nome da despesa' },
      valor: { type: 'number', description: 'Valor total da despesa' },
      grupo_id: { type: 'string', description: 'ID do grupo' },
      membros_participantes: {
        type: 'array',
        items: { type: 'string' },
        description: 'Lista de IDs dos membros participantes da despesa',
      },
      descricao: {
        type: 'string',
        description: 'Descrição da despesa (opcional)',
      },
    },
  },
  response: {
    201: {
      description: 'Despesa criada com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID único da despesa' },
        nome: { type: 'string', description: 'Nome da despesa' },
        valor: { type: 'number', description: 'Valor total da despesa' },
        grupo_id: { type: 'string', description: 'ID do grupo' },
        criado_por: {
          type: 'string',
          description: 'ID do usuário que criou a despesa',
        },
        data_criacao: {
          type: 'string',
          format: 'date-time',
          description: 'Data de criação da despesa',
        },
        descricao: { type: 'string', description: 'Descrição da despesa' },
      },
    },
    400: {
      description: 'Erro ao criar despesa',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de erro' },
        error: { type: 'string', description: 'Detalhes do erro' },
      },
    },
  },
}

export async function despesasGruposRoutes(app: FastifyInstance) {
  app.get(
    '/despesas-grupo',
    { schema: getDespesasGruposSchema, preHandler: authMiddleware },
    despesasGruposController.getDespesasGrupos,
  )
  app.post(
    '/despesas-grupo',
    { schema: createDespesaGrupoSchema, preHandler: authMiddleware },
    despesasGruposController.createDespesaGrupo,
  )
}
