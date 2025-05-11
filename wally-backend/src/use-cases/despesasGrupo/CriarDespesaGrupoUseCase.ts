import { DespesasGrupoRepositorio } from '../../repositorios/DespesasGrupoRepositorio'
import { GrupoMembrosRepositorio } from '../../repositorios/GrupoMembrosRepositorio'
import { v4 as uuidv4 } from 'uuid'
interface CriarDespesaGrupoUseCaseProps {
  grupo_id: string
  membros_participantes: string[]
  usuario_id: string
  nome: string
  valor: number
}

export class CriarDespesaGrupoUseCase {
  constructor(
    private readonly despesasGruposRepositorio: DespesasGrupoRepositorio,
    private readonly grupoMembrosRepositorio: GrupoMembrosRepositorio,
  ) {}

  async execute({
    grupo_id,
    membros_participantes,
    usuario_id,
    nome,
    valor,
  }: CriarDespesaGrupoUseCaseProps) {
    const grupoMembros = await this.grupoMembrosRepositorio.findByUserIds(
      membros_participantes,
      grupo_id,
    )

    if (grupoMembros.length === 0) {
      return {
        success: false,
      }
    }

    const usuarioMembro = grupoMembros.find(
      (membro) => membro.usuario_id === usuario_id,
    )

    if (!usuarioMembro) {
      return {
        success: false,
        despesa: null,
        error: 'Membro não encontrado',
      }
    }

    const despesaIdUnico = uuidv4()

    const novasDespesas = grupoMembros.map((membro) => {
      const tipo = membro.usuario_id === usuario_id ? 'PAGAMENTO' : 'DESPESA'

      const valorUsuario =
        tipo === 'PAGAMENTO' ? valor : valor / membros_participantes.length

      const valorParticipantes = valor / membros_participantes.length

      return {
        despesa_id_unico: despesaIdUnico,
        nome,
        tipo,
        usuario_id,
        grupo_id,
        valor: valorUsuario,
        quantidade_participantes: membros_participantes.length,
        usuario_criador: membro.usuario_id === usuario_id,
        valor_por_participante: valorParticipantes,
        valor_total: valor,
        grupo_membros_id: membro.id,
        total_pago: null,
        data_pago: null,
      }
    })

    const despesas =
      await this.despesasGruposRepositorio.createMany(novasDespesas)

    return {
      success: true,
      despesas,
      error: null,
    }
  }
}
