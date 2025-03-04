import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Pedido, Estado } from '@prisma/client';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  // Crear un pedido
  async crearPedido(descripcion: string, usuarioId: string): Promise<Pedido> {
    return await this.prisma.pedido.create({
      data: {
        descripcion,
        estado: Estado.PENDIENTE,  // Establecer un estado por defecto
        usuarioId,
      },
    });
  }

  // Listar los pedidos de un usuario
  async listarPedidos(usuarioId: string): Promise<Pedido[]> {
    return await this.prisma.pedido.findMany({
      where: {
        usuarioId,
      },
    });
  }

  // Cambiar el estado de un pedido
  async cambiarEstado(id: number, nuevoEstado: Estado): Promise<Pedido> {
    return await this.prisma.pedido.update({
      where: { id },
      data: { estado: nuevoEstado },
    });
  }
}
