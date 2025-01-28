import { Module } from '@nestjs/common';
import { PedidoModule } from 'src/modules/pedidos/pedido.module';
import { ProdutoModule } from 'src/modules/produtos/produto.module';

@Module({
  imports: [ProdutoModule, PedidoModule],
})
export class AppModule {}
