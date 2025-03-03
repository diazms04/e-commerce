import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
const bcrypt = require('bcryptjs');

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async crearUsuario(nombre: string, email: string, password: string) {
    if (!password) {
      throw new Error('La contraseña es requerida');
    }

    const hash = await bcrypt.hash(password, 10);
    return this.prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hash,
      },
    });
  }

  async buscarPorEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async obtenerPorId(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id: id.toString() },
    });
  }
}
