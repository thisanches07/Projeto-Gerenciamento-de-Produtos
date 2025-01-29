import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CriarProdutoDto } from 'src/types/dtos/produto.insert.dto';
import { ProdutoResponseDto } from 'src/types/dtos/produto.response.dto';
import { EditarProdutoDto } from 'src/types/dtos/produto.update.dto';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly service: ProdutoService) {}

  @Get()
  async listarProdutos(): Promise<ProdutoResponseDto[]> {
    return await this.service.listarProdutos();
  }

  @Post()
  async criarProduto(
    @Body() data: CriarProdutoDto,
  ): Promise<ProdutoResponseDto> {
    return await this.service.criarProduto(data);
  }

  @Patch('/:id')
  async editarProduto(
    @Param('id') id: string,
    @Body() data: EditarProdutoDto,
  ): Promise<ProdutoResponseDto> {
    return await this.service.editarProduto(id, data);
  }

  @Delete('/:id')
  async deletarProduto(
    @Param('id') id: string,
  ): Promise<{ sucesso: boolean; message: string }> {
    return await this.service.deletarProduto(id);
  }
}
