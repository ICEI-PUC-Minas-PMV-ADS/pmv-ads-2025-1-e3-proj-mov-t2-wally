import { FastifyInstance } from 'fastify'

import { usuariosRoutes } from './usuarios.routes'
import { transacoesRoutes } from './transacoes.routes'
import { statusRoutes } from './status.routes'
import { gruposRoutes } from './grupos.routes'
import { authRoutes } from './auth.routes'
import { pagamentosRoutes } from './pagamentos.routes'
import { despesasGruposRoutes } from './despesas-grupos.routes'

export async function routes(app: FastifyInstance) {
  app.register(usuariosRoutes)
  app.register(transacoesRoutes)
  app.register(statusRoutes)
  app.register(gruposRoutes)
  app.register(authRoutes)
  app.register(pagamentosRoutes)
  app.register(despesasGruposRoutes)
}
