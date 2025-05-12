import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { GrupoMembro } from './GrupoMembro'

@Entity({ name: 'despesas_grupo' })
export class DespesaGrupo {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: true })
  despesa_id_unico: string

  @Column({ type: 'varchar', length: 100 })
  nome: string

  @Column({ type: 'enum', enum: ['PAGAMENTO', 'DESPESA'] })
  tipo: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_total: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_por_participante: number

  @Column({ type: 'integer', default: 1 })
  quantidade_participantes: number

  @Column({ type: 'timestamp', nullable: true })
  data_pago: Date

  @Column({ type: 'timestamp', nullable: true })
  total_pago: Date

  @Column({ type: 'boolean', default: false })
  usuario_criador: boolean

  @ManyToOne(() => GrupoMembro)
  @JoinColumn({ name: 'grupo_membros_id' })
  grupo_membro: GrupoMembro

  @Column({ type: 'uuid' })
  grupo_membros_id: string

  @CreateDateColumn()
  data_criacao: Date

  @UpdateDateColumn()
  data_atualizacao: Date

  @DeleteDateColumn()
  data_exclusao: Date
}
