import { AppDataSource } from '../data-source'
import { PagamentoDespesa } from '../entity/PagamentoDespesa'

export class PagamentosDespesasRepositorio {
  private repositorio = AppDataSource.getRepository(PagamentoDespesa)

  async create(despesa_id: string, valor: number) {
    const pagamento = this.repositorio.create({
      despesa_id,
      valor,
    })

    await this.repositorio.save(pagamento)

    return pagamento
  }

  async findByDespesaId(despesa_id: string) {
    const pagamentos = await this.repositorio.find({
      where: { despesa_id },
    })

    return pagamentos
  }
}
