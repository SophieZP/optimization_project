import { ApiProperty } from '@nestjs/swagger';
import { TransportSolutionDto } from '../../transport/dto';
import { KnapsackSolutionDto } from '../../cargo/dto';

export class RouteOptimization {
  @ApiProperty({ description: 'Origen de la ruta', example: 'Centro A' })
  origin: string;

  @ApiProperty({ description: 'Destino de la ruta', example: 'Ciudad X' })
  destination: string;

  @ApiProperty({
    description: 'Cantidad a transportar en esta ruta',
    example: 50,
  })
  quantity: number;

  @ApiProperty({ description: 'Costo de transporte', example: 500 })
  transportCost: number;

  @ApiProperty({
    description: 'Optimización de carga para esta ruta',
    type: KnapsackSolutionDto,
    required: false,
  })
  cargoOptimization?: KnapsackSolutionDto;

  @ApiProperty({
    description: 'Beneficio neto de esta ruta (beneficio carga - costo transporte)',
    example: 400,
  })
  netProfit: number;
}

export class IntegratedSolutionDto {
  @ApiProperty({
    description: 'Solución del problema de transporte',
    type: TransportSolutionDto,
  })
  transportSolution: TransportSolutionDto;

  @ApiProperty({
    description: 'Optimización de cada ruta activa',
    type: [RouteOptimization],
  })
  routeOptimizations: RouteOptimization[];

  @ApiProperty({
    description: 'Costo total de transporte',
    example: 2500,
  })
  totalTransportCost: number;

  @ApiProperty({
    description: 'Beneficio total de todas las cargas',
    example: 5000,
  })
  totalCargoProfit: number;

  @ApiProperty({
    description: 'Beneficio neto total (beneficio - costos)',
    example: 2500,
  })
  totalNetProfit: number;

  @ApiProperty({
    description: 'Número de rutas activas',
    example: 5,
  })
  activeRoutes: number;

  @ApiProperty({
    description: 'Resumen de la optimización integrada',
    example: 'Problema dual resuelto exitosamente',
  })
  summary: string;
}
