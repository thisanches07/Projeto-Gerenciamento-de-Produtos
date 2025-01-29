import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class EditarProdutoDto {
  @IsString({ message: 'nome deve ser uma string' })
  @IsOptional()
  nome: string;

  @IsString({ message: 'categoria deve ser uma string' })
  @IsOptional()
  categoria: string;

  @IsNumber(undefined, { message: 'preco deve ser um número' })
  @IsOptional()
  @Min(0.01, { message: 'O preço deve ser maior que zero' })
  preco: number;

  @IsString({ message: 'descricao deve ser uma string' })
  @IsOptional()
  descricao: string;

  @IsOptional()
  @IsInt({ message: 'quantidade em estoque deve ser um número inteiro.' })
  quantidade_estoque: number;
}
