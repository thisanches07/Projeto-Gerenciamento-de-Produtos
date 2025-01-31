import { CriarPedidoDto } from '@app/types/dtos/pedido.insert.dto';
import { PedidoResponseDto } from '@app/types/dtos/pedido.response.dto';
import { Pedido } from '@app/types/entidades/pedido.entity';
import { ProdutoPedido } from '@app/types/entidades/produto-pedido.entity';
import { PedidoStatus } from '@app/types/enum/pedido-status.enum';
import { PedidoAssembler } from '@modules/pedidos/assembler/pedido-assembler';
import { ProdutoService } from '@modules/produtos/produto.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,

    @InjectRepository(ProdutoPedido)
    private readonly produtoPedidoRepository: Repository<ProdutoPedido>,

    private readonly produtoService: ProdutoService,
  ) {}
  async listarPedidos(): Promise<PedidoResponseDto[]> {
    const pedidos = await this.pedidoRepository.find({
      relations: ['produtos', 'produtos.produto'],
    });
    return PedidoAssembler.assemblePedidosResponse(pedidos);
  }

  async listarPedidoById(id: string): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['produtos', 'produtos.produto'],
    });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return PedidoAssembler.assemblePedidoResponse(pedido);
  }

  async criarPedido(data: CriarPedidoDto): Promise<PedidoResponseDto> {
    const pedido = this.pedidoRepository.create({
      total_pedido: 0,
      status: PedidoStatus.PENDENTE,
    });

    const produtosPedido: ProdutoPedido[] = [];

    for (const produtoASerPedido of data.produtos) {
      const { nome, quantidade } = produtoASerPedido;
      const produto = await this.produtoService.listarProdutoByNome(nome);
      this.produtoService.validarDisponibilidadeDeProduto(produto, quantidade);

      const produtoPedido = new ProdutoPedido();
      produtoPedido.produto = produto;
      produtoPedido.quantidade = quantidade;
      produtoPedido.pedido = pedido;

      pedido.total_pedido += produto.preco * quantidade;
      produtosPedido.push(produtoPedido);
    }
    await this.pedidoRepository.save(pedido);
    await this.produtoPedidoRepository.save(produtosPedido);

    const pedidoComProdutos = await this.pedidoRepository.findOne({
      where: { id: pedido.id },
      relations: ['produtos', 'produtos.produto'],
    });

    return PedidoAssembler.assemblePedidoResponse(pedidoComProdutos);
  }

  async concluirPedido(id: string): Promise<PedidoResponseDto> {
    const pedido = await this.listarPedidoById(id);

    if (pedido.status !== PedidoStatus.PENDENTE) {
      throw new BadRequestException('O pedido não está pendente');
    }

    if (pedido) {
      for (const produtoPedido of pedido.produtos) {
        this.produtoService.atualizarQuantidadeDeProdutoPedido(
          produtoPedido.produto,
          produtoPedido.quantidade,
        );
      }
    } else {
      throw new NotFoundException('Pedido não encontrado');
    }

    await this.pedidoRepository.update(id, {
      status: PedidoStatus.CONCLUIDO,
    });

    return await this.listarPedidoById(id);
  }
}
