import { FastifyRequest, FastifyReply } from 'fastify'
import { GetUsuarioBalancoUseCase } from '../use-cases/status/GetUsuarioBalancoUseCase'
import { TransacoesRepositorio } from '../repositorios/TransacoesRepositorio'
import { UsuariosRepositorio } from '../repositorios/UsuariosRepositorio'

const transacoesRepositorio = new TransacoesRepositorio()
const usuariosRepositorio = new UsuariosRepositorio()

export class UsuarioStatusController {
  async getBalancoUsuario(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { usuario_id, data_inicial, data_final } = request.query as {
        usuario_id: string
        data_inicial: string
        data_final: string
      }

      const params = {
        ...(usuario_id && { usuario_id }),
        ...(data_inicial && { data_inicial: new Date(data_inicial) }),
        ...(data_final && { data_final: new Date(data_final) }),
      }

      const getUsuarioBalancoUseCase = new GetUsuarioBalancoUseCase(
        transacoesRepositorio,
        usuariosRepositorio,
      )

      const usuarioStatus = await getUsuarioBalancoUseCase.execute(params)

      return reply.status(200).send(usuarioStatus)
    } catch (error) {
      return reply.status(500).send({
        message: 'Erro ao buscar status do usuário',
        error,
      })
    }
  }
}
