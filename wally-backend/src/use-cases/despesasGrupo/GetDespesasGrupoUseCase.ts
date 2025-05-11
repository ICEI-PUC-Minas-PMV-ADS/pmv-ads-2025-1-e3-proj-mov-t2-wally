import { DespesasGrupoRepositorio } from '../../repositorios/DespesasGrupoRepositorio'
import { GrupoMembrosRepositorio } from '../../repositorios/GrupoMembrosRepositorio'

export class GetDespesasGrupoUseCase {
  constructor(
    private readonly despesasGruposRepositorio: DespesasGrupoRepositorio,
    private readonly grupoMembrosRepositorio: GrupoMembrosRepositorio,
  ) {}

  async execute({ grupo_id }: { grupo_id: string }) {
    const grupoMembros =
      await this.grupoMembrosRepositorio.findAllByGroupId(grupo_id)

    if (grupoMembros.length === 0) {
      return {
        success: false,
        despesas: [],
        error: 'Grupo não encontrado',
      }
    }

    const despesas =
      await this.despesasGruposRepositorio.findByUserIdAndGrupoId(
        grupoMembros.map((membro) => membro.id),
      )

    return {
      success: true,
      despesas,
      error: null,
    }
  }
}
