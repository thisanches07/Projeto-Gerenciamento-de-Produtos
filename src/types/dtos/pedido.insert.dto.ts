import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class ProdutoEQuantidade {
  @IsString({ message: 'nome do produto deve ser uma string' })
  @IsNotEmpty({ message: 'nome do produto é obrigatório' })
  nome: string;

  @IsNotEmpty({ message: 'quantidade do produto é obrigatória' })
  @IsInt({ message: 'quantidade do produto deve ser um número inteiro.' })
  quantidade: number;
}
export class CriarPedidoDto {
  @IsArray({ message: 'Produtos deve ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => ProdutoEQuantidade)
  @IsNotEmpty({ message: 'Produtos não pode estar vazio.' })
  produtos: ProdutoEQuantidade[];
}
