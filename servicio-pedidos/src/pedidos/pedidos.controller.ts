import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido, Estado } from '@prisma/client';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  // Crear un pedido
  @Post()
  async crearPedido(
    @Body() body: { descripcion: string, usuarioId: string },
  ): Promise<Pedido> {
    return this.pedidosService.crearPedido(body.descripcion, body.usuarioId);
  }

  // Listar los pedidos de un usuario
  @Get('usuario/:usuarioId')
  async listarPedidos(
    @Param('usuarioId') usuarioId: string,  // Recibimos el parametro como string
  ): Promise<Pedido[]> {
    return this.pedidosService.listarPedidos(usuarioId); // Pasamos el string al servicio
  }

  // Cambiar estado de un pedido
  @Put(':id/estado')  // Cambiado a PUT
  async cambiarEstado(
    @Param('id') id: string,  // Recibimos el ID como string
    @Body() body: { estado: string },
  ): Promise<Pedido> {
    const idNumber = parseInt(id, 10);  // Convertimos el ID a número
    const estado: Estado = Estado[body.estado as keyof Estado];
    return this.pedidosService.cambiarEstado(idNumber, estado);  // Pasamos el ID como número
  }
}
