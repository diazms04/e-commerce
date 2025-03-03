import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],  // Asegúrate de exportarlo para que otros módulos lo utilicen
})
export class PrismaModule {}
