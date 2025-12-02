import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMinSize, ValidateNested, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { OriginDto } from './origin.dto';
import { DestinationDto } from './destination.dto';
import { IsValidCostMatrix } from '../../../common/decorators';

export class TransportProblemDto {
  @ApiProperty({
    description: 'Lista de orígenes con sus capacidades',
    type: [OriginDto],
    example: [
      { name: 'Origen A', supply: 100 },
      { name: 'Origen B', supply: 150 },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OriginDto)
  origins: OriginDto[];

  @ApiProperty({
    description: 'Lista de destinos con sus demandas',
    type: [DestinationDto],
    example: [
      { name: 'Destino X', demand: 80 },
      { name: 'Destino Y', demand: 120 },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DestinationDto)
  destinations: DestinationDto[];

  @ApiProperty({
    description: 'Matriz de costos de transporte [orígenes][destinos]. Cada fila representa un origen y cada columna un destino.',
    example: [
      [10, 20],
      [15, 10],
    ],
    required: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @Validate(IsValidCostMatrix)
  costs: number[][];
}
