import { ProdutoResponseDto } from '@app/types/dtos/produto.response.dto';
import { PedidoStatus } from '@app/types/enum/pedido-status.enum';
import { ApiProperty } from '@nestjs/swagger';

class ProdutoPedidoResponseDto {
  @ApiProperty({
    type: ProdutoResponseDto,
  })
  produto: ProdutoResponseDto;

  @ApiProperty({
    example: 10,
  })
  quantidade: number;
}
export class PedidoResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;
  @ApiProperty({
    type: [ProdutoPedidoResponseDto],
  })
  produtos: ProdutoPedidoResponseDto[];

  @ApiProperty({
    example: 1000,
  })
  total_pedido: number;

  @ApiProperty({
    example: 'Pendente',
  })
  status: PedidoStatus;
}
