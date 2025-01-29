import { ProdutoAssembler } from 'src/modules/produtos/assembler/produto-assembler';
import { PedidoResponseDto } from 'src/types/dtos/pedido.response.dto';
import { Pedido } from 'src/types/entidades/pedido.entity';

export class PedidoAssembler {
  static assemblePedidosResponse(data: Pedido): PedidoResponseDto {
    return {
      id: data.id,
      produtos: data.produtos?.map((produto) =>
        ProdutoAssembler.assembleCriarProdutoResponse(produto),
      ),
      status: data.status,
      total_pedido: data.total_pedido,
    };
  }
}
