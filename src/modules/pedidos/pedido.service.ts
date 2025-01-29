import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoAssembler } from 'src/modules/pedidos/assembler/pedido-assembler';
import { ProdutoService } from 'src/modules/produtos/produto.service';
import { CriarPedidoDto } from 'src/types/dtos/pedido.insert.dto';
import { PedidoResponseDto } from 'src/types/dtos/pedido.response.dto';
import { Pedido } from 'src/types/entidades/pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    private readonly produtoService: ProdutoService,
  ) {}
  async listarPedidos(): Promise<PedidoResponseDto[]> {
    const pedidos = await this.pedidoRepository.find();
    return PedidoAssembler.assemblePedidosResponse(pedidos);
  }

  criarPedido(data: CriarPedidoDto): string {
    return 'criarPedidos';
  }
}
