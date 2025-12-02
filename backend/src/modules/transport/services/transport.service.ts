import { Injectable, BadRequestException } from '@nestjs/common';
import {
  TransportProblemDto,
  TransportSolutionDto,
  AllocationDetail,
} from '../dto';

/**
 * Servicio para resolver problemas de transporte
 * 
 * Implementa el Método de Aproximación de Vogel (VAM) para encontrar
 * una solución básica factible de alta calidad al problema de transporte.
 * 
 * @remarks
 * El problema de transporte consiste en determinar cómo distribuir productos
 * desde múltiples orígenes hacia múltiples destinos minimizando el costo total.
 * 
 * @example
 * ```typescript
 * const problem = {
 *   origins: [{ name: 'A', supply: 100 }],
 *   destinations: [{ name: 'X', demand: 100 }],
 *   costs: [[10]]
 * };
 * const solution = transportService.solve(problem);
 * ```
 */
@Injectable()
export class TransportService {
  /**
   * Resuelve el problema de transporte usando el Método de Aproximación de Vogel (VAM)
   */
  solve(problem: TransportProblemDto): TransportSolutionDto {
    this.validateProblem(problem);

    const { origins, destinations, costs } = problem;
    const numOrigins = origins.length;
    const numDestinations = destinations.length;

    // Copiar datos para no modificar los originales
    const supply = origins.map((o) => o.supply);
    const demand = destinations.map((d) => d.demand);
    const costMatrix = costs.map((row) => [...row]);

    // Verificar si el problema está balanceado
    const totalSupply = supply.reduce((sum, s) => sum + s, 0);
    const totalDemand = demand.reduce((sum, d) => sum + d, 0);
    const isBalanced = totalSupply === totalDemand;

    // Balancear el problema si es necesario
    if (!isBalanced) {
      this.balanceProblem(supply, demand, costMatrix);
    }

    // Matriz de asignaciones
    const allocations: number[][] = Array(numOrigins)
      .fill(0)
      .map(() => Array(numDestinations).fill(0));

    // Aplicar el Método de Vogel
    this.vogelApproximationMethod(
      supply,
      demand,
      costMatrix,
      allocations,
      numOrigins,
      numDestinations,
    );

    // Calcular costo total y detalles
    const { totalCost, allocationDetails } = this.calculateResults(
      allocations,
      costs,
      origins,
      destinations,
    );

    return {
      allocations,
      totalCost,
      allocationDetails,
      method: 'Método de Aproximación de Vogel (VAM)',
      isBalanced,
    };
  }

  /**
   * Implementación del Método de Aproximación de Vogel
   */
  private vogelApproximationMethod(
    supply: number[],
    demand: number[],
    costs: number[][],
    allocations: number[][],
    numOrigins: number,
    numDestinations: number,
  ): void {
    const rowActive = Array(numOrigins).fill(true);
    const colActive = Array(numDestinations).fill(true);

    while (this.hasActiveSupplyOrDemand(supply, demand)) {
      // Calcular penalizaciones para filas y columnas
      const rowPenalties = this.calculateRowPenalties(
        costs,
        colActive,
        rowActive,
        numOrigins,
        numDestinations,
      );
      const colPenalties = this.calculateColPenalties(
        costs,
        rowActive,
        colActive,
        numOrigins,
        numDestinations,
      );

      // Encontrar la penalización máxima
      const maxRowPenalty = Math.max(...rowPenalties.filter((p) => p >= 0));
      const maxColPenalty = Math.max(...colPenalties.filter((p) => p >= 0));

      let row: number, col: number;

      if (maxRowPenalty >= maxColPenalty) {
        // Usar fila con mayor penalización
        row = rowPenalties.indexOf(maxRowPenalty);
        col = this.findMinCostInRow(costs[row], colActive);
      } else {
        // Usar columna con mayor penalización
        col = colPenalties.indexOf(maxColPenalty);
        row = this.findMinCostInCol(costs, col, rowActive);
      }

      // Realizar asignación
      const allocation = Math.min(supply[row], demand[col]);
      allocations[row][col] = allocation;
      supply[row] -= allocation;
      demand[col] -= allocation;

      // Desactivar fila o columna si se agotó
      if (supply[row] === 0) rowActive[row] = false;
      if (demand[col] === 0) colActive[col] = false;
    }
  }

  /**
   * Calcula penalizaciones para cada fila
   */
  private calculateRowPenalties(
    costs: number[][],
    colActive: boolean[],
    rowActive: boolean[],
    numOrigins: number,
    numDestinations: number,
  ): number[] {
    const penalties: number[] = [];

    for (let i = 0; i < numOrigins; i++) {
      if (!rowActive[i]) {
        penalties.push(-1);
        continue;
      }

      const activeCosts = costs[i]
        .map((cost, j) => (colActive[j] ? cost : Infinity))
        .filter((cost) => cost !== Infinity)
        .sort((a, b) => a - b);

      if (activeCosts.length >= 2) {
        penalties.push(activeCosts[1] - activeCosts[0]);
      } else if (activeCosts.length === 1) {
        penalties.push(activeCosts[0]);
      } else {
        penalties.push(-1);
      }
    }

    return penalties;
  }

  /**
   * Calcula penalizaciones para cada columna
   */
  private calculateColPenalties(
    costs: number[][],
    rowActive: boolean[],
    colActive: boolean[],
    numOrigins: number,
    numDestinations: number,
  ): number[] {
    const penalties: number[] = [];

    for (let j = 0; j < numDestinations; j++) {
      if (!colActive[j]) {
        penalties.push(-1);
        continue;
      }

      const activeCosts: number[] = [];
      for (let i = 0; i < numOrigins; i++) {
        if (rowActive[i]) {
          activeCosts.push(costs[i][j]);
        }
      }

      activeCosts.sort((a, b) => a - b);

      if (activeCosts.length >= 2) {
        penalties.push(activeCosts[1] - activeCosts[0]);
      } else if (activeCosts.length === 1) {
        penalties.push(activeCosts[0]);
      } else {
        penalties.push(-1);
      }
    }

    return penalties;
  }

  /**
   * Encuentra el costo mínimo en una fila
   */
  private findMinCostInRow(row: number[], colActive: boolean[]): number {
    let minCost = Infinity;
    let minCol = -1;

    for (let j = 0; j < row.length; j++) {
      if (colActive[j] && row[j] < minCost) {
        minCost = row[j];
        minCol = j;
      }
    }

    return minCol;
  }

  /**
   * Encuentra el costo mínimo en una columna
   */
  private findMinCostInCol(
    costs: number[][],
    col: number,
    rowActive: boolean[],
  ): number {
    let minCost = Infinity;
    let minRow = -1;

    for (let i = 0; i < costs.length; i++) {
      if (rowActive[i] && costs[i][col] < minCost) {
        minCost = costs[i][col];
        minRow = i;
      }
    }

    return minRow;
  }

  /**
   * Verifica si aún hay oferta o demanda activa
   */
  private hasActiveSupplyOrDemand(
    supply: number[],
    demand: number[],
  ): boolean {
    return supply.some((s) => s > 0) || demand.some((d) => d > 0);
  }

  /**
   * Balancea el problema agregando fila o columna ficticia
   */
  private balanceProblem(
    supply: number[],
    demand: number[],
    costs: number[][],
  ): void {
    const totalSupply = supply.reduce((sum, s) => sum + s, 0);
    const totalDemand = demand.reduce((sum, d) => sum + d, 0);

    if (totalSupply > totalDemand) {
      // Agregar destino ficticio
      demand.push(totalSupply - totalDemand);
      costs.forEach((row) => row.push(0));
    } else if (totalDemand > totalSupply) {
      // Agregar origen ficticio
      supply.push(totalDemand - totalSupply);
      costs.push(Array(demand.length).fill(0));
    }
  }

  /**
   * Calcula el costo total y los detalles de asignación
   */
  private calculateResults(
    allocations: number[][],
    costs: number[][],
    origins: any[],
    destinations: any[],
  ): { totalCost: number; allocationDetails: AllocationDetail[] } {
    let totalCost = 0;
    const allocationDetails: AllocationDetail[] = [];

    for (let i = 0; i < allocations.length; i++) {
      for (let j = 0; j < allocations[i].length; j++) {
        if (allocations[i][j] > 0) {
          const quantity = allocations[i][j];
          const unitCost = costs[i][j];
          const cost = quantity * unitCost;
          totalCost += cost;

          allocationDetails.push({
            origin: origins[i]?.name || `Origen ${i + 1}`,
            destination: destinations[j]?.name || `Destino ${j + 1}`,
            quantity,
            unitCost,
            totalCost: cost,
          });
        }
      }
    }

    return { totalCost, allocationDetails };
  }

  /**
   * Valida que el problema esté bien formado
   */
  private validateProblem(problem: TransportProblemDto): void {
    const { origins, destinations, costs } = problem;

    if (origins.length === 0) {
      throw new BadRequestException('Debe haber al menos un origen');
    }

    if (destinations.length === 0) {
      throw new BadRequestException('Debe haber al menos un destino');
    }

    if (costs.length !== origins.length) {
      throw new BadRequestException(
        'La matriz de costos debe tener una fila por cada origen',
      );
    }

    costs.forEach((row, i) => {
      if (row.length !== destinations.length) {
        throw new BadRequestException(
          `La fila ${i} de costos debe tener una columna por cada destino`,
        );
      }
    });

    // Validar que todos los valores sean no negativos
    origins.forEach((origin, i) => {
      if (origin.supply < 0) {
        throw new BadRequestException(
          `La oferta del origen ${i} no puede ser negativa`,
        );
      }
    });

    destinations.forEach((dest, i) => {
      if (dest.demand < 0) {
        throw new BadRequestException(
          `La demanda del destino ${i} no puede ser negativa`,
        );
      }
    });
  }
}
