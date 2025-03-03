import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';

@Controller('auth')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.autenticacionService.login(await this.autenticacionService.validarUsuario(loginDto.email, loginDto.password));
  }
}
