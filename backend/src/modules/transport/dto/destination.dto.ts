import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class DestinationDto {
  @ApiProperty({
    description: 'Nombre o identificador del destino',
    example: 'Ciudad X',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Demanda requerida en el destino',
    example: 50,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  demand: number;
}
