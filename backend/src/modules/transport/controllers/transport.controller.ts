import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransportService } from '../services/transport.service';
import { TransportProblemDto, TransportSolutionDto } from '../dto';

@ApiTags('transport')
@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Post('solve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Resolver problema de transporte',
    description:
      'Resuelve un problema de transporte utilizando el Método de Aproximación de Vogel (VAM) para encontrar la solución de costo mínimo',
  })
  @ApiResponse({
    status: 200,
    description: 'Problema resuelto exitosamente',
    type: TransportSolutionDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  solve(@Body() problem: TransportProblemDto): TransportSolutionDto {
    return this.transportService.solve(problem);
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Validar problema de transporte',
    description:
      'Valida que los datos del problema estén bien formados sin resolverlo',
  })
  @ApiResponse({
    status: 200,
    description: 'Problema válido',
    schema: {
      properties: {
        valid: { type: 'boolean', example: true },
        message: {
          type: 'string',
          example: 'El problema es válido y puede ser resuelto',
        },
        isBalanced: { type: 'boolean', example: true },
        totalSupply: { type: 'number', example: 250 },
        totalDemand: { type: 'number', example: 250 },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Problema inválido',
  })
  validate(@Body() problem: TransportProblemDto) {
    try {
      // Intentar resolver para validar
      this.transportService.solve(problem);

      const totalSupply = problem.origins.reduce(
        (sum, o) => sum + o.supply,
        0,
      );
      const totalDemand = problem.destinations.reduce(
        (sum, d) => sum + d.demand,
        0,
      );
      const isBalanced = totalSupply === totalDemand;

      return {
        valid: true,
        message: 'El problema es válido y puede ser resuelto',
        isBalanced,
        totalSupply,
        totalDemand,
      };
    } catch (error) {
      return {
        valid: false,
        message: error.message,
      };
    }
  }
}
