import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { PrismaModule } from './prisma/prisma.module';  // Importamos el módulo de Prisma
import { NatsModule } from './nats/nats.module';  // Importamos el módulo de NATS

@Module({
  imports: [
    UsuariosModule, 
    AutenticacionModule, 
    PrismaModule,    // Añadimos PrismaModule
    NatsModule       // Añadimos el NatsModule
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
