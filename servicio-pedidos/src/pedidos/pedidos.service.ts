import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class PedidosService {
  constructor(
    @Inject('PEDIDOS_SERVICE') private readonly client: ClientProxy, // Aquí está el Inject
  ) {}

  // Método para emitir un evento de NATS si es necesario
  emitirEventoDePedido(pedidoData: any): Observable<any> {
    return this.client.emit('pedido_creado', pedidoData);
  }
}
