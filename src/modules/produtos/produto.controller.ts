import { CriarProdutoDto } from '@app/types/dtos/produto.insert.dto';
import { ProdutoResponseDto } from '@app/types/dtos/produto.response.dto';
import { EditarProdutoDto } from '@app/types/dtos/produto.update.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProdutoService } from './produto.service';

@ApiTags('Produtos')
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly service: ProdutoService) {}

  @Get()
  @ApiOkResponse({
    description: 'Lista de produtos retornada',
    type: [ProdutoResponseDto],
  })
  async listarProdutos(): Promise<ProdutoResponseDto[]> {
    return await this.service.listarProdutos();
  }

  @Post()
  @ApiBody({ type: CriarProdutoDto })
  @ApiOkResponse({
    description: 'Produto criado',
    type: ProdutoResponseDto,
  })
  async criarProduto(
    @Body() data: CriarProdutoDto,
  ): Promise<ProdutoResponseDto> {
    return await this.service.criarProduto(data);
  }

  @Patch('/:id')
  @ApiBody({ type: CriarProdutoDto })
  @ApiOkResponse({
    description: 'Produto editado',
    type: ProdutoResponseDto,
  })
  async editarProduto(
    @Param('id') id: string,
    @Body() data: EditarProdutoDto,
  ): Promise<ProdutoResponseDto> {
    return await this.service.editarProduto(id, data);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Produto deletado',
  })
  async deletarProduto(
    @Param('id') id: string,
  ): Promise<{ sucesso: boolean; message: string }> {
    return await this.service.deletarProduto(id);
  }
}
