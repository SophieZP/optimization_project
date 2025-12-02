import { ApiProperty } from '@nestjs/swagger';

export class SelectedItemDetail {
  @ApiProperty({ description: 'ID del item seleccionado', example: '1' })
  id: string;

  @ApiProperty({ description: 'Nombre del item', example: 'Electrónicos' })
  name: string;

  @ApiProperty({ description: 'Peso del item', example: 10 })
  weight: number;

  @ApiProperty({ description: 'Beneficio del item', example: 100 })
  profit: number;
}

export class KnapsackSolutionDto {
  @ApiProperty({
    description: 'IDs de los items seleccionados para transportar',
    example: ['1', '3'],
  })
  selectedItemIds: string[];

  @ApiProperty({
    description: 'Detalles de los items seleccionados',
    type: [SelectedItemDetail],
  })
  selectedItems: SelectedItemDetail[];

  @ApiProperty({
    description: 'Beneficio total obtenido',
    example: 190,
  })
  totalProfit: number;

  @ApiProperty({
    description: 'Peso total de la carga seleccionada',
    example: 25,
  })
  totalWeight: number;

  @ApiProperty({
    description: 'Capacidad utilizada (porcentaje)',
    example: 50,
  })
  utilizationPercentage: number;

  @ApiProperty({
    description: 'Capacidad restante',
    example: 25,
  })
  remainingCapacity: number;

  @ApiProperty({
    description: 'Método utilizado para resolver el problema',
    example: 'Programación Dinámica - Mochila 0/1',
  })
  method: string;
}
