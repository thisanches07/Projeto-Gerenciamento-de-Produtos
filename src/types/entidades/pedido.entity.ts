import { ProdutoPedido } from 'src/types/entidades/produto-pedido.entity';
import { PedidoStatus } from 'src/types/enum/pedido-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProdutoPedido, (produtoPedido) => produtoPedido.pedido, {
    eager: true,
  })
  produtos: ProdutoPedido[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_pedido: number;

  @Column({ type: 'enum', enum: PedidoStatus, default: PedidoStatus.PENDENTE })
  status: PedidoStatus;
}
