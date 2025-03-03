import { Module } from '@nestjs/common';
import { PedidosModule } from './pedidos/pedidos.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PedidosModule,
    ClientsModule.register([
      {
        name: 'PEDIDOS_SERVICE',
        transport: Transport.NATS,
        options: {
          url: 'nats://localhost:4222', // Dirección de tu servidor NATS
        },
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
