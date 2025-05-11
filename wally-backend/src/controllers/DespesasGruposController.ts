import { FastifyRequest, FastifyReply } from 'fastify'
import { DespesasGrupoRepositorio } from '../repositorios/DespesasGrupoRepositorio'
import { GrupoMembrosRepositorio } from '../repositorios/GrupoMembrosRepositorio'
import { CriarDespesaGrupoUseCase } from '../use-cases/despesasGrupo/CriarDespesaGrupoUseCase'
import { GetDespesasGrupoUseCase } from '../use-cases/despesasGrupo/GetDespesasGrupoUseCase'

const despesasGruposRepositorio = new DespesasGrupoRepositorio()
const grupoMembrosRepositorio = new GrupoMembrosRepositorio()

export class DespesasGruposController {
  async getDespesasGrupos(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { grupo_id } = request.query as {
        grupo_id: string
      }

      const getDespesasGrupoUseCase = new GetDespesasGrupoUseCase(
        despesasGruposRepositorio,
        grupoMembrosRepositorio,
      )

      const { success, despesas, error } =
        await getDespesasGrupoUseCase.execute({ grupo_id })

      if (!success) {
        return reply.status(400).send({
          message: 'Erro ao buscar despesas grupos',
          error,
        })
      }

      return reply.status(200).send(despesas)
    } catch (error) {
      return reply.status(500).send({
        message: 'Erro ao buscar despesas grupos',
        error,
      })
    }
  }

  async createDespesaGrupo(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { nome, valor, usuario_id, grupo_id, membros_participantes } =
        request.body as {
          nome: string
          valor: number
          usuario_id: string
          grupo_id: string
          membros_participantes: string[]
        }

      const criarDespesaGrupoUseCase = new CriarDespesaGrupoUseCase(
        despesasGruposRepositorio,
        grupoMembrosRepositorio,
      )

      const { success, despesa, error } =
        await criarDespesaGrupoUseCase.execute({
          nome,
          valor,
          usuario_id,
          grupo_id,
          membros_participantes,
        })

      if (!success) {
        return reply.status(400).send({
          message: 'Erro ao criar despesa grupo',
          error,
        })
      }

      return reply.status(201).send(despesa)
    } catch (error) {
      return reply.status(500).send({
        message: 'Erro ao criar despesa grupo',
        error,
      })
    }
  }
}
