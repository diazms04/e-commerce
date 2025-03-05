import { ApiProperty } from '@nestjs/swagger';

export class RespuestaUsuarioDto {
  @ApiProperty({ example: '123456789', description: 'ID del usuario' })
  id: string;

  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo del usuario' })
  nombre: string;

  @ApiProperty({ example: 'juan.perez@email.com', description: 'Correo electrónico del usuario' })
  email: string;

  @ApiProperty({ example: '2024-03-04T12:34:56.789Z', description: 'Fecha de creación del usuario' })
  creadoEn: Date;
}
