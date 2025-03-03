import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsuariosModule,
    PassportModule,
    JwtModule.register({
      secret: 'secreto_super_seguro', // Usa variables de entorno en producción
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, JwtStrategy],
  exports: [AutenticacionService],
})
export class AutenticacionModule {}
