import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogDeRequisicoesMiddleware } from 'src/middlewares/log.middleware';
import { PedidoModule } from 'src/modules/pedidos/pedido.module';
import { ProdutoModule } from 'src/modules/produtos/produto.module';
const ormconfig = require('../../ormconfig.js');
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ProdutoModule, PedidoModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogDeRequisicoesMiddleware).forRoutes('*');
  }
}
