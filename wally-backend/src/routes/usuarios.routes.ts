import { FastifyInstance } from 'fastify'
import { UsuariosController } from '../controllers/UsuariosController'
import { authMiddleware } from '../middleware'

const usuariosController = new UsuariosController()

const findAllSchema = {
  tags: ['usuarios'],
  summary: 'Listar todos os usuários',
  description: 'Retorna uma lista de todos os usuários cadastrados',
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      description: 'Lista de usuários retornada com sucesso',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID único do usuário' },
          nome: { type: 'string', description: 'Nome completo do usuário' },
          email: { type: 'string', description: 'E-mail do usuário' },
          telefone: { type: 'string', description: 'Número de telefone' },
          data_nascimento: {
            type: 'string',
            description: 'Data de nascimento',
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

const findByEmailSchema = {
  tags: ['usuarios'],
  summary: 'Buscar usuário por e-mail',
  description: 'Retorna os dados de um usuário específico pelo e-mail',
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    required: ['email'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'E-mail do usuário',
      },
    },
  },
  response: {
    200: {
      description: 'Usuário encontrado com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID único do usuário' },
        nome: { type: 'string', description: 'Nome completo do usuário' },
        email: { type: 'string', description: 'E-mail do usuário' },
        telefone: { type: 'string', description: 'Número de telefone' },
        data_nascimento: { type: 'string', description: 'Data de nascimento' },
      },
    },
    404: {
      description: 'Usuário não encontrado',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de erro' },
      },
    },
  },
}

const createSchema = {
  tags: ['usuarios'],
  summary: 'Criar novo usuário',
  description: 'Cria um novo usuário no sistema',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    required: [
      'nome',
      'email',
      'senha',
      'confirmacao_senha',
      'telefone',
      'data_nascimento',
    ],
    properties: {
      nome: { type: 'string', description: 'Nome completo do usuário' },
      email: {
        type: 'string',
        format: 'email',
        description: 'E-mail do usuário',
      },
      senha: {
        type: 'string',
        minLength: 6,
        description: 'Senha do usuário (mínimo 6 caracteres)',
      },
      confirmacao_senha: {
        type: 'string',
        description: 'Confirmação da senha',
      },
      telefone: { type: 'string', description: 'Número de telefone com DDD' },
      data_nascimento: {
        type: 'string',
        format: 'date',
        description: 'Data de nascimento (YYYY-MM-DD)',
      },
    },
  },
  response: {
    201: {
      description: 'Usuário criado com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID único do usuário' },
        nome: { type: 'string', description: 'Nome completo do usuário' },
        email: { type: 'string', description: 'E-mail do usuário' },
        telefone: { type: 'string', description: 'Número de telefone' },
        data_nascimento: { type: 'string', description: 'Data de nascimento' },
      },
    },
    400: {
      description: 'Erro na criação do usuário',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de erro' },
        error: { type: 'string', description: 'Detalhes do erro' },
      },
    },
  },
}

const updateSchema = {
  tags: ['usuarios'],
  summary: 'Atualizar usuário',
  description: 'Atualiza os dados de um usuário existente',
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'ID do usuário' },
    },
  },
  body: {
    type: 'object',
    required: ['nome', 'email'],
    properties: {
      nome: { type: 'string', description: 'Nome completo do usuário' },
      email: {
        type: 'string',
        format: 'email',
        description: 'E-mail do usuário',
      },
    },
  },
  response: {
    200: {
      description: 'Usuário atualizado com sucesso',
      type: 'object',
      properties: {
        id: { type: 'string', description: 'ID único do usuário' },
        nome: { type: 'string', description: 'Nome completo do usuário' },
        email: { type: 'string', description: 'E-mail do usuário' },
        telefone: { type: 'string', description: 'Número de telefone' },
        data_nascimento: { type: 'string', description: 'Data de nascimento' },
      },
    },
    404: {
      description: 'Usuário não encontrado',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de erro' },
      },
    },
  },
}

const deleteSchema = {
  tags: ['usuarios'],
  summary: 'Excluir usuário',
  description: 'Remove um usuário do sistema',
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'ID do usuário' },
    },
  },
  response: {
    200: {
      description: 'Usuário excluído com sucesso',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de confirmação' },
      },
    },
    404: {
      description: 'Usuário não encontrado',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de erro' },
      },
    },
  },
}

export async function usuariosRoutes(app: FastifyInstance) {
  app.get(
    '/usuarios',
    { schema: findAllSchema, preHandler: authMiddleware },
    usuariosController.findAll,
  )
  app.get(
    '/usuarios/:email',
    { schema: findByEmailSchema, preHandler: authMiddleware },
    usuariosController.findByEmail,
  )
  app.post(
    '/usuarios',
    { schema: createSchema, preHandler: authMiddleware },
    usuariosController.create,
  )
  app.put(
    '/usuarios/:id',
    { schema: updateSchema, preHandler: authMiddleware },
    usuariosController.update,
  )
  app.delete(
    '/usuarios/:id',
    { schema: deleteSchema, preHandler: authMiddleware },
    usuariosController.delete,
  )
}
