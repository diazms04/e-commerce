import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';
import { CrearUsuarioDto } from './dto/create-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registro')
  async registrarUsuario(@Body() dto: CrearUsuarioDto) {
    const { nombre, email, password } = dto;
    return this.usuariosService.crearUsuario(nombre, email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async obtenerPerfil(@Request() req) {
    return this.usuariosService.obtenerPorId(req.user.id);
  }
}
