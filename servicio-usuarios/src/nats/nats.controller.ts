import { Controller, Get } from '@nestjs/common';
import { NatsService } from './nats.service';

@Controller('nats')
export class NatsController {
  constructor(private readonly natsService: NatsService) {}

  @Get('send')
  sendMessage() {
    this.natsService.publishMessage('test', '¡Hola desde el microservicio NestJS!');
    return 'Mensaje enviado';
  }

  @Get('listen')
  listenToMessages() {

    return 'Escuchando mensajes...';
  }
}
