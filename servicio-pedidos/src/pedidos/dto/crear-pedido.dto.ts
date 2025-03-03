import { IsString, IsInt, IsEnum } from 'class-validator';

export class CrearPedidoDto {
  @IsString()
  descripcion: string;

  @IsInt()
  usuarioId: number;

  @IsEnum(['PENDIENTE', 'EN_PROCESO', 'COMPLETADO'])
  estado: string;
}
