import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Estado } from '@prisma/client';

export class CrearPedidoDto {
  @ApiProperty({ description: 'Descripción del pedido', example: 'Pedido de libros' })
  @IsString()
  descripcion: string;

  @ApiProperty({ description: 'ID del usuario', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  usuarioId: string;

  @ApiProperty({ enum: Estado, description: 'Estado del pedido', example: 'PENDIENTE' })
  @IsEnum(Estado)
  estado: Estado;
}
