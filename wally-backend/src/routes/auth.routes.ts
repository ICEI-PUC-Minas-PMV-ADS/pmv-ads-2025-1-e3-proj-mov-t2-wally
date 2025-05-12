import { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/AuthController'

const authController = new AuthController()

const signInSchema = {
  schema: {
    tags: ['auth'],
    summary: 'Entrar no aplicativo',
    description: 'Autentica um usuário e retorna um token JWT',
    body: {
      type: 'object',
      required: ['email', 'senha'],
      properties: {
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
      },
    },
    response: {
      200: {
        description: 'Login realizado com sucesso',
        type: 'object',
        properties: {
          token: { type: 'string', description: 'Token JWT para autenticação' },
          usuario: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'ID único do usuário' },
              nome: { type: 'string', description: 'Nome completo do usuário' },
              email: { type: 'string', description: 'E-mail do usuário' },
            },
          },
        },
      },
      401: {
        description: 'Credenciais inválidas',
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Mensagem de erro' },
          error: { type: 'string', description: 'Detalhes do erro' },
        },
      },
    },
  },
}

const signUpSchema = {
  schema: {
    tags: ['auth'],
    summary: 'Criar nova conta',
    description: 'Registra um novo usuário no sistema',
    body: {
      type: 'object',
      required: ['email', 'senha', 'nome', 'telefone', 'data_nascimento'],
      properties: {
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
        nome: { type: 'string', description: 'Nome completo do usuário' },
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
          data_nascimento: {
            type: 'string',
            description: 'Data de nascimento',
          },
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
  },
}

const forgotPasswordSchema = {
  schema: {
    tags: ['auth'],
    summary: 'Solicitar redefinição de senha',
    description: 'Envia um e-mail com link para redefinição de senha',
    body: {
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
        description: 'E-mail de redefinição enviado com sucesso',
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Mensagem de confirmação' },
          url: { type: 'string', description: 'URL para redefinição de senha' },
        },
      },
      400: {
        description: 'Erro ao enviar e-mail de redefinição',
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Mensagem de erro' },
          error: { type: 'string', description: 'Detalhes do erro' },
        },
      },
    },
  },
}

const resetPasswordSchema = {
  schema: {
    tags: ['auth'],
    summary: 'Redefinir senha',
    description:
      'Redefine a senha do usuário usando o token recebido por e-mail',
    body: {
      type: 'object',
      required: ['token', 'senha'],
      properties: {
        token: {
          type: 'string',
          description: 'Token de redefinição recebido por e-mail',
        },
        senha: {
          type: 'string',
          minLength: 6,
          description: 'Nova senha (mínimo 6 caracteres)',
        },
      },
    },
    response: {
      200: {
        description: 'Senha redefinida com sucesso',
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Mensagem de confirmação' },
        },
      },
      400: {
        description: 'Erro ao redefinir senha',
        type: 'object',
        properties: {
          message: { type: 'string', description: 'Mensagem de erro' },
          error: { type: 'string', description: 'Detalhes do erro' },
        },
      },
    },
  },
}

export async function authRoutes(app: FastifyInstance) {
  app.post('/sign-in', signInSchema, authController.signIn)
  app.post('/sign-up', signUpSchema, authController.signUp)
  app.post(
    '/forgot-password',
    forgotPasswordSchema,
    authController.forgotPassword,
  )
  app.post('/reset-password', resetPasswordSchema, authController.resetPassword)
}
