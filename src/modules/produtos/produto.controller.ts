import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly service: ProdutoService) {}

  @Get()
  listarProdutos(): string {
    return this.service.listarProdutos();
  }

  @Post()
  criarProduto(): string {
    return this.service.criarProduto();
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
