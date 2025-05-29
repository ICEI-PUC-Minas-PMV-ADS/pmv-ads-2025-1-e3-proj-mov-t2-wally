import { In } from 'typeorm'
import { AppDataSource } from '../data-source'
import { GrupoMembro } from '../entity/GrupoMembro'

export class GrupoMembrosRepositorio {
  private repositorio = AppDataSource.getRepository(GrupoMembro)

  async findAllByUsuarioId(usuario_id: string): Promise<GrupoMembro[]> {
    const grupos = await this.repositorio.find({
      where: { usuario_id },
      relations: ['grupo'],
    })

    return grupos
  }

  async findByUserIds(
    usuario_ids: string[],
    grupo_id: string,
  ): Promise<GrupoMembro[]> {
    const grupoMembros = await this.repositorio.find({
      where: { usuario_id: In(usuario_ids), grupo_id },
      relations: ['grupo'],
    })

    return grupoMembros
  }

  async findAllByGroupId(grupo_id: string): Promise<GrupoMembro[]> {
    const grupos = await this.repositorio.find({
      where: { grupo_id },
      relations: ['grupo', 'user'],
    })

    return grupos
  }

  async findByUsuarioIdAndGroupId(
    usuario_id: string,
    grupo_id: string,
  ): Promise<GrupoMembro | null> {
    return this.repositorio.findOne({ where: { usuario_id, grupo_id } })
  }

  async createMany(
    grupo_id: string,
    membros_ids: string[],
    admin_id: string,
  ): Promise<GrupoMembro[]> {
    console.log({ grupo_id, membros_ids, admin_id })
    const grupoMembros = membros_ids.map((membro_id) =>
      this.repositorio.create({
        grupo_id,
        usuario_id: membro_id,
        tipo: membro_id === admin_id ? 'ADMIN' : 'MEMBRO',
      }),
    )
    await this.repositorio.save(grupoMembros)
    return grupoMembros
  }

  async deleteMany(membros_ids: string[]) {
    await this.repositorio.delete(membros_ids)
  }
}
