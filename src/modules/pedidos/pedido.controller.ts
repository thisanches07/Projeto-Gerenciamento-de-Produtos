import { Controller, Get, Post } from '@nestjs/common';
import { PedidoService } from 'src/modules/pedidos/pedido.service';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly service: PedidoService) {}

  @Get()
  listarPedidos(): string {
    return this.service.listarPedidos();
  }

  @Post()
  criarPedido(): string {
    return this.service.criarPedido();
  }
}
