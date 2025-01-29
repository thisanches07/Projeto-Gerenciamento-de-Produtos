import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CriarProdutoDto {
  @IsString({ message: 'nome deve ser uma string' })
  @IsNotEmpty({ message: 'nome é obrigatório' })
  nome: string;

  @IsString({ message: 'categoria deve ser uma string' })
  @IsNotEmpty({ message: 'categoria é obrigatório' })
  categoria: string;

  @IsNumber(undefined, { message: 'preco deve ser um número' })
  @IsNotEmpty({ message: 'preco é obrigatório' })
  @Min(0.01, { message: 'O preço deve ser maior que zero' })
  preco: number;

  @IsString({ message: 'descricao deve ser uma string' })
  @IsNotEmpty({ message: 'descricao é obrigatória' })
  descricao: string;

  @IsNotEmpty({ message: 'quantidade em estoque é obrigatória' })
  @IsInt({ message: 'quantidade em estoque deve ser um número inteiro.' })
  quantidade_estoque: number;
}
