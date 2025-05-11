import { GrupoMembro } from '../../entity/GrupoMembro'
import { GrupoMembrosRepositorio } from '../../repositorios/GrupoMembrosRepositorio'

interface AtualizarGrupoMembrosUseCaseParams {
  grupo_id: string
  membros: string[]
  admin_id: string
}

interface AtualizarGrupoMembrosUseCaseResponse {
  success: boolean
  grupoMembros: GrupoMembro[]
  error: string | null
}

export class AtualizarGrupoMembrosUseCase {
  constructor(
    private readonly grupoMembrosRepositorio: GrupoMembrosRepositorio,
  ) {}

  async execute({
    grupo_id,
    membros,
    admin_id,
  }: AtualizarGrupoMembrosUseCaseParams): Promise<AtualizarGrupoMembrosUseCaseResponse> {
    const grupoMembros =
      await this.grupoMembrosRepositorio.findAllByGroupId(grupo_id)

    const membrosIds = grupoMembros.map((grupoMembro) => grupoMembro.id)

    const membrosIdsParaRemover = membrosIds.filter(
      (membroId) => !membros.includes(membroId),
    )

    const membrosIdsParaAdicionar = membros.filter(
      (membroId) => !membrosIds.includes(membroId),
    )

    await this.grupoMembrosRepositorio.deleteMany(membrosIdsParaRemover)

    const gruposMembrosAtualizados =
      await this.grupoMembrosRepositorio.createMany(
        grupo_id,
        membrosIdsParaAdicionar,
        admin_id,
      )

    return {
      success: true,
      grupoMembros: gruposMembrosAtualizados,
      error: null,
    }
  }
}
