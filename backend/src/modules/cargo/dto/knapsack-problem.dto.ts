import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMinSize, ValidateNested, IsNumber, Min, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { CargoItemDto } from './cargo-item.dto';
import { HasUniqueIds } from '../../../common/decorators';

export class KnapsackProblemDto {
  @ApiProperty({
    description: 'Capacidad máxima de carga del tren (en unidades de peso o volumen)',
    example: 50,
    minimum: 0,
    required: true,
  })
  @IsNumber()
  @Min(0)
  capacity: number;

  @ApiProperty({
    description: 'Lista de mercancías disponibles para transportar',
    type: [CargoItemDto],
    example: [
      { id: '1', name: 'Electrónicos', weight: 10, profit: 100 },
      { id: '2', name: 'Textiles', weight: 20, profit: 150 },
      { id: '3', name: 'Alimentos', weight: 15, profit: 90 },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CargoItemDto)
  @Validate(HasUniqueIds)
  items: CargoItemDto[];
}
