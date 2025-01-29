import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from 'src/modules/produtos/produto.module';
import { Pedido } from 'src/types/entidades/pedido.entity';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido]), ProdutoModule],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
