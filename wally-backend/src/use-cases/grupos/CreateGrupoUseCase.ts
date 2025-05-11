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

    await this.grupoMembrosRepositorio.createMany(grupo.id, membros, usuario_id)

    return grupo
  }
}
