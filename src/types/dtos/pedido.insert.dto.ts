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
  nome: string;

  @IsInt({ message: 'Quantidade deve ser um número inteiro' })
  @IsPositive({ message: 'Quantidade deve ser maior que zero' })
  @IsNotEmpty({ message: 'Quantidade é obrigatória' })
  quantidade: number;
}

export class CriarPedidoDto {
  @IsArray({ message: 'Produtos deve ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => ProdutoQuantidadeDto)
  @IsNotEmpty({ message: 'A lista de produtos não pode estar vazia' })
  produtos: ProdutoQuantidadeDto[];
}
