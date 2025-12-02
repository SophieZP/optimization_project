import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OptimizationService } from '../services/optimization.service';
import { IntegratedProblemDto, IntegratedSolutionDto } from '../dto';

@ApiTags('optimization')
@Controller('optimization')
export class OptimizationController {
  constructor(private readonly optimizationService: OptimizationService) {}

  @Post('solve-complete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Resolver problema dual completo',
    description:
      'Resuelve el problema integrado de transporte y carga. ' +
      'Primero optimiza las rutas de distribución usando el Método de Vogel, ' +
      'luego optimiza la carga de cada ruta usando el algoritmo de la Mochila 0/1',
  })
  @ApiResponse({
    status: 200,
    description: 'Problema dual resuelto exitosamente',
    type: IntegratedSolutionDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  solveComplete(
    @Body() problem: IntegratedProblemDto,
  ): IntegratedSolutionDto {
    return this.optimizationService.solveIntegratedProblem(problem);
  }

  @Post('summary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener resumen del problema',
    description:
      'Analiza el problema sin resolverlo completamente, proporcionando información sobre dimensiones y potencial',
  })
  @ApiResponse({
    status: 200,
    description: 'Resumen generado exitosamente',
    schema: {
      properties: {
        problemDimensions: {
          type: 'object',
          properties: {
            origins: { type: 'number' },
            destinations: { type: 'number' },
            totalSupply: { type: 'number' },
            totalDemand: { type: 'number' },
            isBalanced: { type: 'boolean' },
          },
        },
        cargoInformation: {
          type: 'object',
          properties: {
            routesWithCargo: { type: 'number' },
            totalAvailableItems: { type: 'number' },
            totalPotentialProfit: { type: 'number' },
          },
        },
        recommendation: { type: 'string' },
      },
    },
  })
  getSummary(@Body() problem: IntegratedProblemDto): any {
    return this.optimizationService.getOptimizationSummary(problem);
  }

  @Post('analyze-efficiency')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Analizar eficiencia de rutas',
    description:
      'Analiza la eficiencia (beneficio neto / costo) de cada ruta potencial',
  })
  @ApiResponse({
    status: 200,
    description: 'Análisis completado exitosamente',
    schema: {
      type: 'array',
      items: {
        properties: {
          origin: { type: 'string' },
          destination: { type: 'string' },
          transportCost: { type: 'number' },
          optimalCargoProfit: { type: 'number' },
          potentialCargoProfit: { type: 'number' },
          netProfit: { type: 'number' },
          efficiency: { type: 'number' },
          isProfit: { type: 'boolean' },
        },
      },
    },
  })
  analyzeEfficiency(@Body() problem: IntegratedProblemDto): any[] {
    return this.optimizationService.analyzeRouteEfficiency(problem);
  }
}
