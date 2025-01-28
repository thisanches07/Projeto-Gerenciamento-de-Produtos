import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoModule } from 'src/modules/pedidos/pedido.module';
import { ProdutoModule } from 'src/modules/produtos/produto.module';
const ormconfig = require('../../ormconfig.js');
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ProdutoModule, PedidoModule],
})
export class AppModule {}
