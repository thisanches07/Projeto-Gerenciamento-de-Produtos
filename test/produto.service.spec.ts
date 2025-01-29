import { CriarProdutoDto } from '@app/types/dtos/produto.insert.dto';
import { Produto } from '@app/types/entidades/produto.entity';
import { ProdutoService } from '@modules/produtos/produto.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockProdutoRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
};

describe('ProdutoService', () => {
  let produtoService: ProdutoService;
  let produtoRepository: Repository<Produto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoService,
        {
          provide: getRepositoryToken(Produto),
          useValue: mockProdutoRepository,
        },
      ],
    }).compile();

    produtoService = module.get<ProdutoService>(ProdutoService);
    produtoRepository = module.get<Repository<Produto>>(
      getRepositoryToken(Produto),
    );
  });

  it('Deve listar todos os produtos', async () => {
    const mockProdutos = [
      { id: 1, nome: 'Produto 1', categoria: 'Categoria 1', preco: 10 },
      { id: 2, nome: 'Produto 2', categoria: 'Categoria 2', preco: 20 },
    ];

    mockProdutoRepository.find.mockResolvedValue(mockProdutos);

    const result = await produtoService.listarProdutos();

    expect(result).toEqual(mockProdutos);
    expect(mockProdutoRepository.find).toHaveBeenCalled();
  });

  it('deve criar um produto', async () => {
    const novoProduto: CriarProdutoDto = {
      nome: 'Produto Teste',
      categoria: 'Categoria Teste',
      descricao: 'Descricao teste',
      quantidade_estoque: 10,
      preco: 100,
    };
    const produtoCriado = { ...novoProduto, id: 1 };

    mockProdutoRepository.create.mockReturnValue(produtoCriado);
    mockProdutoRepository.save.mockResolvedValue(produtoCriado);

    const result = await produtoService.criarProduto(novoProduto);

    expect(result).toEqual(produtoCriado);
    expect(mockProdutoRepository.save).toHaveBeenCalledWith(produtoCriado);
  });
});
