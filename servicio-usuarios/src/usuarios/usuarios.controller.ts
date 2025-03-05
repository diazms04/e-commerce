import { 
  Controller, Post, Body, Get, Request, UseGuards, UsePipes, ValidationPipe, NotFoundException 
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from '../autenticacion/jwt-auth.guard';
import { CrearUsuarioDto } from './dto/create-usuario.dto';
import { RespuestaUsuarioDto } from './dto/get-usuario.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Usuarios') // Categoriza los endpoints en Swagger
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('registro')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async registrarUsuario(@Body() dto: CrearUsuarioDto) {
    const { nombre, email, password } = dto;
    return this.usuariosService.crearUsuario(nombre, email, password);
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil del usuario', type: RespuestaUsuarioDto })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiBearerAuth()
  async obtenerPerfil(@Request() req): Promise<RespuestaUsuarioDto> {
    const usuario = await this.usuariosService.obtenerPorId(req.user.id);
    
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Eliminamos la contraseña antes de devolver la respuesta
    const { password, ...usuarioSinPassword } = usuario;
    return usuarioSinPassword as RespuestaUsuarioDto;
  }
}
