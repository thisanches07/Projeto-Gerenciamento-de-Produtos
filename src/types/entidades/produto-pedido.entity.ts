import { Pedido } from '@app/types/entidades/pedido.entity';
import { Produto } from '@app/types/entidades/produto.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProdutoPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.produtos)
  pedido: Pedido;

  @ManyToOne(() => Produto)
  produto: Produto;

  @Column({ type: 'int' })
  quantidade: number;
}
