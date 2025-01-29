import { ProdutoResponseDto } from 'src/types/dtos/produto.response.dto';
import { Produto } from 'src/types/entidades/produto.entity';

export class ProdutoAssembler {
  static assembleProdutoResponse(produto: Produto): ProdutoResponseDto {
    return {
      id: produto.id,
      nome: produto.nome,
      categoria: produto.categoria,
      preco: produto.preco,
      descricao: produto.descricao,
      quantidade_estoque: produto.quantidade_estoque,
    };
  }
  static assembleProdutosResponse(produto: Produto[]): ProdutoResponseDto[] {
    return produto.map((produto) => this.assembleProdutoResponse(produto));
  }
}
