import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class OriginDto {
  @ApiProperty({
    description: 'Nombre o identificador del origen',
    example: 'Centro de Distribución A',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Oferta o capacidad disponible del origen',
    example: 100,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  supply: number;
}
