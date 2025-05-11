import { Between } from 'typeorm'
import { CriarTransacaoDTO } from '../../dtos/CriarTransacaoDTO'
import { AppDataSource } from '../data-source'
import { Transacao } from '../entity/Transacao'

interface FindAllByUsuarioIdFromIntervalParams {
  usuario_id: string
  tipo?: string
  data_inicial?: Date
  data_final?: Date
}

export class TransacoesRepositorio {
  private repositorio = AppDataSource.getRepository(Transacao)

  async findAllByUsuarioId(
    usuario_id: string,
    tipo?: string,
  ): Promise<Transacao[]> {
    const transacoes = await this.repositorio.find({
      where: { usuario_id, tipo },
    })

    return transacoes
  }

  async findAllByUsuarioIdFromInterval({
    usuario_id,
    tipo,
    data_inicial,
    data_final,
  }: FindAllByUsuarioIdFromIntervalParams): Promise<Transacao[]> {
    const where = {
      usuario_id,
      ...(tipo && { tipo }),
      ...(data_inicial &&
        data_final && {
          data: Between(data_inicial, data_final),
        }),
    }

    console.log({ where })

    const transacoes = await this.repositorio.find({
      where,
    })

    return transacoes
  }

  async create({
    nome,
    valor,
    tipo,
    usuario_id,
    data,
  }: CriarTransacaoDTO): Promise<Transacao> {
    const transacao = this.repositorio.create({
      nome,
      valor,
      tipo,
      usuario_id,
      data,
    })

    await this.repositorio.save(transacao)

    return transacao
  }
}
