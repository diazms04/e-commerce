import { 
  Controller, Post, Body, BadRequestException, UnauthorizedException, UsePipes, ValidationPipe 
} from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso', schema: { example: { access_token: 'jwt_token' } } })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  async login(@Body() loginDto: LoginDto) {
    const usuario = await this.autenticacionService.validarUsuario(loginDto.email, loginDto.password);

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    return this.autenticacionService.login(usuario);
  }
}
