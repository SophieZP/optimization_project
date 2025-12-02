import { ApiProperty } from '@nestjs/swagger';

export class AllocationDetail {
  @ApiProperty({ description: 'Nombre del origen', example: 'Origen A' })
  origin: string;

  @ApiProperty({ description: 'Nombre del destino', example: 'Destino X' })
  destination: string;

  @ApiProperty({ description: 'Cantidad asignada', example: 50 })
  quantity: number;

  @ApiProperty({ description: 'Costo unitario', example: 10 })
  unitCost: number;

  @ApiProperty({ description: 'Costo total de esta asignación', example: 500 })
  totalCost: number;
}

export class TransportSolutionDto {
  @ApiProperty({
    description: 'Matriz de asignaciones [orígenes][destinos]',
    example: [
      [50, 50],
      [30, 120],
    ],
  })
  allocations: number[][];

  @ApiProperty({
    description: 'Costo total de transporte',
    example: 2500,
  })
  totalCost: number;

  @ApiProperty({
    description: 'Detalles de las asignaciones realizadas',
    type: [AllocationDetail],
  })
  allocationDetails: AllocationDetail[];

  @ApiProperty({
    description: 'Método utilizado para resolver el problema',
    example: 'Método de Aproximación de Vogel',
  })
  method: string;

  @ApiProperty({
    description: 'Indica si el problema está balanceado',
    example: true,
  })
  isBalanced: boolean;
}
