import { ProdutoResponseDto } from 'src/types/dtos/produto.response.dto';
import { Produto } from 'src/types/entidades/produto.entity';

export class ProdutoAssembler {
  static assembleCriarProdutoResponse(data: Produto): ProdutoResponseDto {
    return {
      id: data.id,
      nome: data.nome,
      categoria: data.categoria,
      preco: data.preco,
      descricao: data.descricao,
      urlImagem: data.urlImagem,
    };
  }
}
