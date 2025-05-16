import { CriarGrupoDTO } from '../../dtos/CriarGrupoDTO'
import { AppDataSource } from '../data-source'
import { Grupo } from '../entity/Grupo'

export class GruposRepositorio {
  private repositorio = AppDataSource.getRepository(Grupo)

  async create({ nome, descricao, avatar_url }: CriarGrupoDTO): Promise<Grupo> {
    const grupo = this.repositorio.create({ nome, descricao, avatar_url })

    await this.repositorio.save(grupo)

    return grupo
  }

  async findById(id: string): Promise<Grupo | null> {
    return this.repositorio.findOne({ where: { id } })
  }
}
