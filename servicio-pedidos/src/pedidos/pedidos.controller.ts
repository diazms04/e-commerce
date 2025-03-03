import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PedidosController {

  // Escucha el evento 'usuario_creado' emitido por el microservicio Usuarios
  @MessagePattern('usuario_creado')
  async handleUsuarioCreado(data: { nombre: string, email: string }) {
    console.log('Nuevo usuario creado:', data);
    // Aquí puedes realizar alguna lógica relacionada con los pedidos,
    // como, por ejemplo, crear un nuevo pedido para el usuario recién creado.
  }
}
