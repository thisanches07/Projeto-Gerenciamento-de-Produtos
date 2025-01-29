import { Pedido } from 'src/types/entidades/pedido.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 255 })
  categoria: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'decimal' })
  quantidade_estoque: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.produtos, { nullable: true })
  pedido: Pedido;
}
