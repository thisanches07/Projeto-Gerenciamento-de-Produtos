import { AutenticacaoModule as AuthModule } from '@app/autenticacao/autenticacao.module';
import { JwtAuthGuard } from '@app/autenticacao/auth.guard';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogDeRequisicoesMiddleware } from 'src/middlewares/log.middleware';
import { PedidoModule } from 'src/modules/pedidos/pedido.module';
import { ProdutoModule } from 'src/modules/produtos/produto.module';
const ormconfig = require('../../ormconfig.js');
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    ProdutoModule,
    PedidoModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogDeRequisicoesMiddleware).forRoutes('*');
  }
}
