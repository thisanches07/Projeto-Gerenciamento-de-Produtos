import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoAssembler } from 'src/modules/produtos/assembler/produto-assembler';
import { CriarProdutoDto } from 'src/types/dtos/produto.insert.dto';
import { ProdutoResponseDto } from 'src/types/dtos/produto.response.dto';
import { Produto } from 'src/types/entidades/produto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}
  async listarProdutos(): Promise<ProdutoResponseDto[]> {
    const produtos = await this.produtoRepository.find();
    const produtosDto = produtos.map((produto) =>
      ProdutoAssembler.assembleCriarProdutoResponse(produto),
    );
    return produtosDto;
  }

  async criarProduto(data: CriarProdutoDto): Promise<ProdutoResponseDto> {
    const produto = await this.produtoRepository.create(data);
    const produtoSalvo = await this.produtoRepository.save(produto);
    if (!produtoSalvo) {
      throw new BadRequestException('Produto não foi criado');
    }
    const produtoDto =
      ProdutoAssembler.assembleCriarProdutoResponse(produtoSalvo);
    return produtoDto;
  }

  editarProduto(): string {
    return 'editarProduto';
  }

  deletarProduto(): string {
    return 'deletarProduto';
  }
}
