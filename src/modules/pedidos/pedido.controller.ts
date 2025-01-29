import { Controller, Get, Post } from '@nestjs/common';
import { PedidoService } from 'src/modules/pedidos/pedido.service';
import { PedidoResponseDto } from 'src/types/dtos/pedido.response.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly service: PedidoService) {}

  @Get()
  async listarPedidos(): Promise<PedidoResponseDto[]> {
    return await this.service.listarPedidos();
  }

  @Post()
  criarPedido(): string {
    return this.service.criarPedido();
  }
}
