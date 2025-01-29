import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoAssembler } from 'src/modules/pedidos/assembler/pedido-assembler';
import { PedidoResponseDto } from 'src/types/dtos/pedido.response.dto';
import { Pedido } from 'src/types/entidades/pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
  ) {}
  async listarPedidos(): Promise<PedidoResponseDto[]> {
    const pedidos = await this.pedidoRepository.find();
    return PedidoAssembler.assemblePedidosResponse(pedidos);
  }

  criarPedido(): string {
    return 'criarPedido';
  }
}
