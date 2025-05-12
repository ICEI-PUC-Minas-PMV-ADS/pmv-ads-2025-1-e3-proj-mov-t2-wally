import { FastifyRequest, FastifyReply } from 'fastify'
import { GetGrupoBalancoUseCase } from '../use-cases/status/GetGrupoBalancoUseCase'
import { DespesasGrupoRepositorio } from '../repositorios/DespesasGrupoRepositorio'
import { GrupoMembrosRepositorio } from '../repositorios/GrupoMembrosRepositorio'

const grupoMembrosRepositorio = new GrupoMembrosRepositorio()
const despesasGrupoRepositorio = new DespesasGrupoRepositorio()

export class GrupoStatusController {
  async getGrupoBalanco(request: FastifyRequest, reply: FastifyReply) {
    const { grupo_id, usuario_id } = request.query as {
      grupo_id: string
      usuario_id: string
    }

    const getGrupoBalancoUseCase = new GetGrupoBalancoUseCase(
      grupoMembrosRepositorio,
      despesasGrupoRepositorio,
    )

    const grupoBalanco = await getGrupoBalancoUseCase.execute({
      grupo_id,
      usuario_id,
    })

    return reply.status(200).send(grupoBalanco)
  }
}
