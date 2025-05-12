import { GruposRepositorio } from '../../repositorios/GruposRepositorio'
import { GrupoMembrosRepositorio } from '../../repositorios/GrupoMembrosRepositorio'

interface CreateGrupoUseCaseParams {
  nome: string
  descricao: string
  avatar_url: string
  membros: string[]
  usuario_id: string
}

export class CreateGrupoUseCase {
  constructor(
    private readonly gruposRepositorio: GruposRepositorio,
    private readonly grupoMembrosRepositorio: GrupoMembrosRepositorio,
  ) {}

  async execute({
    nome,
    descricao,
    avatar_url,
    membros,
    usuario_id,
  }: CreateGrupoUseCaseParams) {
    const grupo = await this.gruposRepositorio.create({
      nome,
      descricao,
      avatar_url,
    })

    if (membros.length === 0) {
      return {
        success: false,
        error: 'O grupo nao possui membros',
        grupo: null,
      }
    }

    const grupoMembros = await this.grupoMembrosRepositorio.createMany(
      grupo.id,
      membros,
      usuario_id,
    )

    return {
      success: true,
      error: null,
      grupo: {
        ...grupo,
        membros: grupoMembros,
      },
    }
  }
}
