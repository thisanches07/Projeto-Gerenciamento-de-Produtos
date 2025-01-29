import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoAssembler } from 'src/modules/produtos/assembler/produto-assembler';
import { CriarProdutoDto } from 'src/types/dtos/produto.insert.dto';
import { ProdutoResponseDto } from 'src/types/dtos/produto.response.dto';
import { EditarProdutoDto } from 'src/types/dtos/produto.update.dto';
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
    return ProdutoAssembler.assembleProdutosResponse(produtos);
  }

  async criarProduto(data: CriarProdutoDto): Promise<ProdutoResponseDto> {
    const produto = await this.produtoRepository.create(data);
    const produtoSalvo = await this.produtoRepository.save(produto);
    if (!produtoSalvo) {
      throw new BadRequestException('Produto não foi criado');
    }

    return ProdutoAssembler.assembleProdutoResponse(produtoSalvo);
  }

  async editarProduto(
    id: string,
    data: EditarProdutoDto,
  ): Promise<ProdutoResponseDto> {
    await this.listarProdutoById(id);
    await this.produtoRepository.update(id, data);
    const produtoAtualizado = await this.listarProdutoById(id);
    return ProdutoAssembler.assembleProdutoResponse(produtoAtualizado);
  }

  private async listarProdutoById(id: string): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  async listarProdutoByNome(nome: string): Promise<ProdutoResponseDto> {
    const produto = await this.produtoRepository.findOne({
      where: { nome },
    });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return ProdutoAssembler.assembleProdutoResponse(produto);
  }

  validarDisponibilidadeDeProduto(produto: Produto, quantidade: number) {
    if (produto.quantidade_estoque < quantidade) {
      throw new NotFoundException(
        `O produto ${produto.nome} possui apenas ${produto.quantidade_estoque} em estoque. Quantidade ${quantidade} inválida! `,
      );
    }
  }

  async atualizarQuantidadeDeProdutoPedido(
    produto: Produto,
    quantidade: number,
  ) {
    await this.produtoRepository.update(produto.id, {
      quantidade_estoque: () => `quantidade_estoque - ${quantidade}`,
    });
  }

  async deletarProduto(
    id: string,
  ): Promise<{ sucesso: boolean; message: string }> {
    await this.listarProdutoById(id);
    const { affected } = await this.produtoRepository.delete(id);

    return affected > 0
      ? { sucesso: true, message: 'Produto deletado com sucesso.' }
      : { sucesso: false, message: 'Falha ao tentar deletar o produto.' };
  }
}
