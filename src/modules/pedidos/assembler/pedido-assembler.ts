import { PedidoResponseDto } from '@app/types/dtos/pedido.response.dto';
import { Pedido } from '@app/types/entidades/pedido.entity';
import { ProdutoPedido } from '@app/types/entidades/produto-pedido.entity';
import { ProdutoAssembler } from '@modules/produtos/assembler/produto-assembler';

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
