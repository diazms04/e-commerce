import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { PrismaModule } from './prisma/prisma.module'; 
import { NatsModule } from './nats/nats.module';  

@Module({
  imports: [
    UsuariosModule, 
    AutenticacionModule, 
    PrismaModule,    
    NatsModule      
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
