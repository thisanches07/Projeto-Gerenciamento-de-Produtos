import { Body, Controller, Get, Post } from '@nestjs/common';
import { PedidoService } from 'src/modules/pedidos/pedido.service';
import { CriarPedidoDto } from 'src/types/dtos/pedido.insert.dto';
import { PedidoResponseDto } from 'src/types/dtos/pedido.response.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly service: PedidoService) {}

  @Get()
  async listarPedidos(): Promise<PedidoResponseDto[]> {
    return await this.service.listarPedidos();
  }

  @Post()
  async criarPedido(@Body() data: CriarPedidoDto): Promise<PedidoResponseDto> {
    return await this.service.criarPedido(data);
  }
}
