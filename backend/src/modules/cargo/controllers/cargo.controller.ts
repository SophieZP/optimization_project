import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CargoService } from '../services/cargo.service';
import { KnapsackProblemDto, KnapsackSolutionDto } from '../dto';

@ApiTags('cargo')
@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Post('solve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Resolver problema de la mochila 0/1',
    description:
      'Resuelve el problema de optimización de carga usando Programación Dinámica para maximizar el beneficio sin exceder la capacidad',
  })
  @ApiResponse({
    status: 200,
    description: 'Problema resuelto exitosamente',
    type: KnapsackSolutionDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  solve(@Body() problem: KnapsackProblemDto): KnapsackSolutionDto {
    return this.cargoService.solve(problem);
  }

  @Post('solve-with-limit')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Resolver mochila con límite de items',
    description:
      'Resuelve el problema de la mochila con una restricción adicional en el número máximo de items a seleccionar',
  })
  @ApiQuery({
    name: 'maxItems',
    required: true,
    type: Number,
    description: 'Número máximo de items a seleccionar',
    example: 3,
  })
  @ApiResponse({
    status: 200,
    description: 'Problema resuelto exitosamente',
    type: KnapsackSolutionDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  solveWithLimit(
    @Body() problem: KnapsackProblemDto,
    @Query('maxItems') maxItems: number,
  ): KnapsackSolutionDto {
    return this.cargoService.solveWithItemLimit(problem, Number(maxItems));
  }

  @Post('optimize')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Optimizar múltiples escenarios',
    description:
      'Resuelve múltiples problemas de mochila en paralelo para diferentes configuraciones',
  })
  @ApiResponse({
    status: 200,
    description: 'Escenarios optimizados exitosamente',
    type: [KnapsackSolutionDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  optimizeMultiple(
    @Body() problems: KnapsackProblemDto[],
  ): KnapsackSolutionDto[] {
    return this.cargoService.optimizeMultipleScenarios(problems);
  }

  @Post('efficiency')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Calcular eficiencia de items',
    description:
      'Calcula la eficiencia (beneficio/peso) de cada item y los ordena de mayor a menor',
  })
  @ApiResponse({
    status: 200,
    description: 'Eficiencia calculada exitosamente',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          weight: { type: 'number' },
          profit: { type: 'number' },
          efficiency: { type: 'number' },
        },
      },
    },
  })
  calculateEfficiency(@Body() problem: KnapsackProblemDto): any[] {
    return this.cargoService.calculateEfficiency(problem);
  }
}
