import { ProdutoResponseDto } from 'src/types/dtos/produto.response.dto';
import { PedidoStatus } from 'src/types/enum/pedido-status.enum';

class ProdutoPedidoResponseDto {
  produto: ProdutoResponseDto;
  quantidade: number;
}
export class PedidoResponseDto {
  id: number;
  produtos: ProdutoPedidoResponseDto[];
  total_pedido: number;
  status: PedidoStatus;
}
