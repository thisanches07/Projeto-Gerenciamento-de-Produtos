import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CriarProdutoDto {
  @IsString({ message: 'nome deve ser uma string' })
  @IsNotEmpty({ message: 'nome é obrigatório' })
  @ApiProperty({
    example: 'Produto 1',
  })
  nome: string;

  @IsString({ message: 'categoria deve ser uma string' })
  @IsNotEmpty({ message: 'categoria é obrigatório' })
  @ApiProperty({
    example: 'Categoria 1',
  })
  categoria: string;

  @IsNumber(undefined, { message: 'preco deve ser um número' })
  @IsNotEmpty({ message: 'preco é obrigatório' })
  @Min(0.01, { message: 'O preço deve ser maior que zero' })
  @ApiProperty({
    example: 100.0,
  })
  preco: number;

  @IsString({ message: 'descricao deve ser uma string' })
  @IsNotEmpty({ message: 'descricao é obrigatória' })
  @ApiProperty({
    example: 'Descrição do produto',
  })
  descricao: string;

  @IsNotEmpty({ message: 'quantidade em estoque é obrigatória' })
  @IsInt({ message: 'quantidade em estoque deve ser um número inteiro.' })
  @ApiProperty({
    example: 1000,
  })
  quantidade_estoque: number;
}
