import { CriarPedidoDto } from '@app/types/dtos/pedido.insert.dto';
import { PedidoResponseDto } from '@app/types/dtos/pedido.response.dto';
import { PedidoService } from '@modules/pedidos/pedido.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

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

  @Patch('/:id/concluir')
  async concluirPedido(@Param('id') id: string): Promise<PedidoResponseDto> {
    return await this.service.concluirPedido(id);
  }
}
