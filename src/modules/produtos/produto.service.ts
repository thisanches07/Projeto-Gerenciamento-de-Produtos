import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoService {
  listarProdutos(): string {
    return 'listarProdutos!';
  }

  criarProduto(): string {
    return 'criarProduto';
  }

  editarProduto(): string {
    return 'editarProduto';
  }

  deletarProduto(): string {
    return 'deletarProduto';
  }
}
