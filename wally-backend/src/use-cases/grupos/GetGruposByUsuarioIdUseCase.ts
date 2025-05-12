import { GrupoMembrosRepositorio } from '../../repositorios/GrupoMembrosRepositorio'

export class GetGruposByUsuarioIdUseCase {
  constructor(
    private readonly grupoMembrosRepositorio: GrupoMembrosRepositorio,
  ) {}

  async execute(usuario_id: string) {
    const grupoMembros =
      await this.grupoMembrosRepositorio.findAllByUsuarioId(usuario_id)

    const grupos = grupoMembros.map((grupoMembro) => grupoMembro.grupo)

    /** Adicionar os campos referentes ao usuário e grupo
     *
     * se está pago
     * quanto deve
     */

    return grupos
  }
}
