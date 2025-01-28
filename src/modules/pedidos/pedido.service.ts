import { Injectable } from '@nestjs/common';

@Injectable()
export class PedidoService {
  listarPedidos(): string {
    return 'listarPedidos';
  }

  criarPedido(): string {
    return 'criarPedido';
  }
}
