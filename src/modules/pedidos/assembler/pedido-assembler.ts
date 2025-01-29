import { ProdutoAssembler } from 'src/modules/produtos/assembler/produto-assembler';
import { PedidoResponseDto } from 'src/types/dtos/pedido.response.dto';
import { Pedido } from 'src/types/entidades/pedido.entity';
import { ProdutoPedido } from 'src/types/entidades/produto-pedido.entity';

export class PedidoAssembler {
  private static assembleProdutoPedido(produtosPedido: ProdutoPedido[]) {
    return produtosPedido.map(({ produto, quantidade }) => {
      return {
        produto: ProdutoAssembler.assembleProdutoResponse(produto),
        quantidade,
      };
    });
  }

  static assemblePedidoResponse(pedido: Pedido): PedidoResponseDto {
    return {
      id: pedido.id,
      produtos: this.assembleProdutoPedido(pedido.produtos),
      status: pedido.status,
      total_pedido: pedido.total_pedido,
    };
  }
  static assemblePedidosResponse(pedidos: Pedido[]): PedidoResponseDto[] {
    return pedidos.map((pedido) => this.assemblePedidoResponse(pedido));
  }
}
