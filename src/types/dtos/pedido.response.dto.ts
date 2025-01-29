import { ProdutoResponseDto } from 'src/types/dtos/produto.response.dto';
import { PedidoStatus } from 'src/types/enum/pedido-status.enum';

export class PedidoResponseDto {
  id: number;
  produtos: ProdutoResponseDto[];
  total_pedido: number;
  status: PedidoStatus;
}
