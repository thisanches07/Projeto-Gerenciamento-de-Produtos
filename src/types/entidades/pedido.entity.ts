import { Produto } from 'src/types/entidades/produto.entity';
import { PedidoStatus } from 'src/types/enum/pedido-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Produto, (produto) => produto.pedido, { cascade: true })
  produtos: Produto[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_pedido: number;

  @Column({ type: 'enum', enum: PedidoStatus, default: PedidoStatus.PENDENTE })
  status: PedidoStatus;
}
