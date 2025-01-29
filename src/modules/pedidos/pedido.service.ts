import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoAssembler } from 'src/modules/pedidos/assembler/pedido-assembler';
import { ProdutoService } from 'src/modules/produtos/produto.service';
import { CriarPedidoDto } from 'src/types/dtos/pedido.insert.dto';
import { PedidoResponseDto } from 'src/types/dtos/pedido.response.dto';
import { Pedido } from 'src/types/entidades/pedido.entity';
import { ProdutoPedido } from 'src/types/entidades/produto-pedido.entity';
import { PedidoStatus } from 'src/types/enum/pedido-status.enum';
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

  async criarPedido(data: CriarPedidoDto): Promise<any> {
    const pedido = this.pedidoRepository.create({
      total_pedido: 0,
      status: PedidoStatus.PENDENTE,
    });

    const produtosPedido: ProdutoPedido[] = [];

    for (const produtoASerPedido of data.produtos) {
      const { nome, quantidade } = produtoASerPedido;
      const produto = await this.produtoService.listarProdutoByNome(nome);
      this.produtoService.atualizarQuantidadeDeProdutoPedido(
        produto,
        quantidade,
      );

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
}
