import { CriarPedidoDto } from '@app/types/dtos/pedido.insert.dto';
import { PedidoResponseDto } from '@app/types/dtos/pedido.response.dto';
import { PedidoService } from '@modules/pedidos/pedido.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Pedidos')
@ApiBearerAuth()
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly service: PedidoService) {}

  @Get()
  @ApiOkResponse({
    description: 'Lista de pedidos retornada',
    type: [PedidoResponseDto],
  })
  async listarPedidos(): Promise<PedidoResponseDto[]> {
    return await this.service.listarPedidos();
  }

  @Post()
  @ApiBody({ type: CriarPedidoDto })
  @ApiOkResponse({
    description: 'Produto criado',
    type: PedidoResponseDto,
  })
  async criarPedido(@Body() data: CriarPedidoDto): Promise<PedidoResponseDto> {
    return await this.service.criarPedido(data);
  }

  @Patch('/:id/concluir')
  @ApiOkResponse({
    description: 'Status do pedido alterado para Concluído',
    type: PedidoResponseDto,
  })
  async concluirPedido(@Param('id') id: string): Promise<PedidoResponseDto> {
    return await this.service.concluirPedido(id);
  }
}
