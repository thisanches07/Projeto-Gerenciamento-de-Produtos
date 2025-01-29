import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class ProdutoResponseDto {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Produto 1',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    example: 'Categoria 1',
  })
  @IsString()
  categoria: string;

  @ApiProperty({
    example: 100.0,
  })
  @IsNumber()
  preco: number;

  @ApiProperty({
    example: 'Descrição do produto',
  })
  @IsOptional()
  @IsString()
  descricao: string;

  @ApiProperty({
    example: 1000,
  })
  @IsUrl()
  quantidade_estoque: number;
}
