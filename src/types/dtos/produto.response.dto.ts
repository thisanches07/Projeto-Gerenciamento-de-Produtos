import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class ProdutoResponseDto {
  id: number;

  @IsString()
  nome: string;

  @IsString()
  categoria: string;

  @IsNumber()
  preco: number;

  @IsOptional()
  @IsString()
  descricao: string;

  @IsUrl()
  urlImagem: string;
}
