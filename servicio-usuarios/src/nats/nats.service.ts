import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, NatsConnection, StringCodec } from 'nats';

@Injectable()
export class NatsService implements OnModuleInit, OnModuleDestroy {
  private nc: NatsConnection;
  private sc = StringCodec(); 

  async onModuleInit() {
    const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';
    this.nc = await connect({ servers: NATS_URL });
    console.log('Conectado a NATS:', NATS_URL);


    this.nc.subscribe('test', {
      callback: (err, msg) => {
        if (err) {
          console.error('Error al recibir mensaje:', err);
          return;
        }
        console.log(`Mensaje recibido: ${this.sc.decode(msg.data)}`);
      },
    });
  }


  async publishMessage(subject: string, message: string) {
    if (this.nc) {
      const encodedMessage = this.sc.encode(message);
      this.nc.publish(subject, encodedMessage);
      console.log(`Mensaje enviado a ${subject}: ${message}`);
    }
  }

  async onModuleDestroy() {
    if (this.nc) {
      await this.nc.close();
      console.log('Conexión cerrada de NATS');
    }
  }
}
