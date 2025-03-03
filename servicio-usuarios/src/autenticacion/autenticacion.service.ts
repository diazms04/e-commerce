import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
const bcrypt = require('bcryptjs');

@Injectable()
export class AutenticacionService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(email: string, password: string): Promise<any> {
    const usuario = await this.usuariosService.buscarPorEmail(email);
    if (usuario && (await bcrypt.compare(password, usuario.password))) {
      const { password, ...resultado } = usuario;
      return resultado;
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async login(usuario: any) {
    const payload = { sub: usuario.id, email: usuario.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
