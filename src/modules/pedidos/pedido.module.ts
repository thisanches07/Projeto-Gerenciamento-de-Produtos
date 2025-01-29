import { Pedido } from '@app/types/entidades/pedido.entity';
import { ProdutoPedido } from '@app/types/entidades/produto-pedido.entity';
import { PedidoController } from '@modules/pedidos/pedido.controller';
import { PedidoService } from '@modules/pedidos/pedido.service';
import { ProdutoModule } from '@modules/produtos/produto.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido]),
    TypeOrmModule.forFeature([ProdutoPedido]),
    ProdutoModule,
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
