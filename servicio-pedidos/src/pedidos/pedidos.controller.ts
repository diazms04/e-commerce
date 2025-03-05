import { Controller, Post, Get, Param, Body, Put } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido, Estado } from '@prisma/client';
import { ApiTags, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Pedidos')  // Etiqueta para Swagger
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  // Crear un pedido
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        descripcion: { type: 'string' },
        usuarioId: { type: 'string' },
      },
      required: ['descripcion', 'usuarioId'],
    },
  })
  @ApiResponse({ status: 201, description: 'Pedido creado exitosamente' })
  async crearPedido(
    @Body() body: { descripcion: string; usuarioId: string },
  ): Promise<Pedido> {
    return this.pedidosService.crearPedido(body.descripcion, body.usuarioId);
  }

  // Listar los pedidos de un usuario
  @Get('usuario/:usuarioId')
  @ApiParam({ name: 'usuarioId', type: 'string', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos del usuario' })
  async listarPedidos(@Param('usuarioId') usuarioId: string): Promise<Pedido[]> {
    return this.pedidosService.listarPedidos(usuarioId);
  }

  // Cambiar estado de un pedido
  @Put(':id/estado')
  @ApiParam({ name: 'id', type: 'string', description: 'ID del pedido' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        estado: { type: 'string', enum: ['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'] },
      },
      required: ['estado'],
    },
  })
  @ApiResponse({ status: 200, description: 'Estado del pedido actualizado' })
  async cambiarEstado(
    @Param('id') id: string,
    @Body() body: { estado: string },
  ): Promise<Pedido> {
    const idNumber = parseInt(id, 10);
    const estado: Estado = Estado[body.estado as keyof Estado];
    return this.pedidosService.cambiarEstado(idNumber, estado);
  }
}
