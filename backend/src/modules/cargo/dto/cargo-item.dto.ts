import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CargoItemDto {
  @ApiProperty({
    description: 'Identificador único del item',
    example: '1',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Nombre o descripción de la mercancía',
    example: 'Electrónicos',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Peso o volumen de la mercancía',
    example: 10,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiProperty({
    description: 'Beneficio o ganancia obtenida por transportar la mercancía',
    example: 100,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  profit: number;

  @ApiProperty({
    description: 'Información adicional sobre el item',
    required: false,
    example: 'Productos electrónicos de alto valor',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
