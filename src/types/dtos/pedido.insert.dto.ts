import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProdutoQuantidadeDto {
  @IsString({ message: 'nome do produto deve ser uma string' })
  @IsNotEmpty({ message: 'nome do produto é obrigatório' })
  @ApiProperty({
    example: 'Produto 1',
  })
  nome: string;

  @IsInt({ message: 'Quantidade deve ser um número inteiro' })
  @IsPositive({ message: 'Quantidade deve ser maior que zero' })
  @IsNotEmpty({ message: 'Quantidade é obrigatória' })
  @ApiProperty({
    example: 10,
  })
  quantidade: number;
}

export class CriarPedidoDto {
  @IsArray({ message: 'Produtos deve ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => ProdutoQuantidadeDto)
  @IsNotEmpty({ message: 'A lista de produtos não pode estar vazia' })
  @ApiProperty({
    type: [ProdutoQuantidadeDto],
  })
  produtos: ProdutoQuantidadeDto[];
}
