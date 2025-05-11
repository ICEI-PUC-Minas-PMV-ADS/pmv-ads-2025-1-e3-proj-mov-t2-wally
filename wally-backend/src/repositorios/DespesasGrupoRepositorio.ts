import { In } from 'typeorm'
import { CriarDespesaGrupoDTO } from '../../dtos/CriarDespesaGrupoDTO'
import { AppDataSource } from '../data-source'
import { DespesaGrupo } from '../entity/DespesaGrupo'

export class DespesasGrupoRepositorio {
  private repositorio = AppDataSource.getRepository(DespesaGrupo)

  async findByUserIdAndGrupoId(
    grupo_membros_id: string[],
  ): Promise<DespesaGrupo[]> {
    return this.repositorio.find({
      where: { grupo_membros_id: In(grupo_membros_id) },
    })
  }

  async create({
    nome,
    valor,
    tipo,
    total_pago,
    data_pago,
    usuario_criador,
    grupo_membros_id,
  }: CriarDespesaGrupoDTO): Promise<DespesaGrupo> {
    const despesa = this.repositorio.create({
      nome,
      valor,
      tipo,
      total_pago,
      data_pago,
      usuario_criador,
      grupo_membros_id,
    })
    return this.repositorio.save(despesa)
  }

  async createMany(
    despesasGrupo: CriarDespesaGrupoDTO[],
  ): Promise<DespesaGrupo[]> {
    const despesas = this.repositorio.create(despesasGrupo)

    return this.repositorio.save(despesas)
  }

  async findAllByGroupMemberId(
    grupo_membros_id: string,
  ): Promise<DespesaGrupo[]> {
    return this.repositorio.find({ where: { grupo_membros_id } })
  }

  async findAllDespesasByGrupoId(
    grupo_membros_id: string[],
  ): Promise<DespesaGrupo[]> {
    return this.repositorio.find({
      where: { grupo_membros_id: In(grupo_membros_id) },
    })
  }
}
