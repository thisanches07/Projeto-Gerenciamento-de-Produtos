import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CriarProdutoDto } from 'src/types/dtos/produto.insert.dto';
import { ProdutoResponseDto } from 'src/types/dtos/produto.response.dto';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly service: ProdutoService) {}

  @Get()
  listarProdutos(): Promise<ProdutoResponseDto[]> {
    return this.service.listarProdutos();
  }

  @Post()
  criarProduto(@Body() data: CriarProdutoDto): Promise<ProdutoResponseDto> {
    return this.service.criarProduto(data);
  }

  @Patch()
  editarProduto(): string {
    return this.service.editarProduto();
  }

  @Delete()
  deletarProduto(): string {
    return this.service.deletarProduto();
  }
}
