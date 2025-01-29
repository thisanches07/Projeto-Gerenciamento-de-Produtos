import { ProdutoAssembler } from 'src/modules/produtos/assembler/produto-assembler';
import { PedidoResponseDto } from 'src/types/dtos/pedido.response.dto';
import { Pedido } from 'src/types/entidades/pedido.entity';

export class PedidoAssembler {
  static assemblePedidoResponse(pedido: Pedido): PedidoResponseDto {
    return {
      id: pedido.id,
      produtos: ProdutoAssembler.assembleProdutosResponse(pedido.produtos),
      status: pedido.status,
      total_pedido: pedido.total_pedido,
    };
  }
  static assemblePedidosResponse(pedidos: Pedido[]): PedidoResponseDto[] {
    return pedidos.map((pedido) => this.assemblePedidoResponse(pedido));
  }
}
