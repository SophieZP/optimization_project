import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TransportProblemDto } from '../../transport/dto';
import { CargoItemDto } from '../../cargo/dto';

export class RouteCargoDto {
  @ApiProperty({
    description: 'Nombre del origen',
    example: 'Centro A',
  })
  origin: string;

  @ApiProperty({
    description: 'Nombre del destino',
    example: 'Ciudad X',
  })
  destination: string;

  @ApiProperty({
    description: 'Capacidad de carga para esta ruta',
    example: 50,
  })
  @IsNumber()
  @Min(0)
  capacity: number;

  @ApiProperty({
    description: 'Items disponibles para esta ruta',
    type: [CargoItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CargoItemDto)
  availableItems: CargoItemDto[];
}

export class IntegratedProblemDto {
  @ApiProperty({
    description: 'Problema de transporte (distribución). Define la red de orígenes, destinos y costos de transporte.',
    type: TransportProblemDto,
    required: true,
  })
  @ValidateNested()
  @Type(() => TransportProblemDto)
  transportProblem: TransportProblemDto;

  @ApiProperty({
    description: 'Configuración de carga para cada ruta posible',
    type: [RouteCargoDto],
    example: [
      {
        origin: 'Centro A',
        destination: 'Ciudad X',
        capacity: 50,
        availableItems: [
          { id: '1', name: 'Electrónicos', weight: 10, profit: 100 },
        ],
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RouteCargoDto)
  routeCargoConfigs: RouteCargoDto[];
}
