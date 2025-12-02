import { Injectable, BadRequestException } from '@nestjs/common';
import { TransportService } from '../../transport/services/transport.service';
import { CargoService } from '../../cargo/services/cargo.service';
import {
  IntegratedProblemDto,
  IntegratedSolutionDto,
  RouteOptimization,
} from '../dto';
import { KnapsackProblemDto, KnapsackSolutionDto } from '../../cargo/dto';

/**
 * Servicio de optimización integrada
 * 
 * Orquesta la resolución del problema dual de optimización ferroviaria:
 * 1. Resuelve la distribución óptima de productos (Problema de Transporte)
 * 2. Optimiza la carga de cada ruta activa (Problema de la Mochila)
 * 3. Calcula el beneficio neto total
 * 
 * @remarks
 * Este servicio combina dos problemas NP-hard clásicos para proporcionar
 * una solución integral que maximiza el beneficio neto de la operación ferroviaria.
 * 
 * El beneficio neto se calcula como:
 * Beneficio Neto = Σ(Beneficio de Carga) - Σ(Costo de Transporte)
 * 
 * @example
 * ```typescript
 * const problem = {
 *   transportProblem: {...},
 *   routeCargoConfigs: [...]
 * };
 * const solution = optimizationService.solveIntegratedProblem(problem);
 * console.log(solution.totalNetProfit);
 * ```
 */
@Injectable()
export class OptimizationService {
  constructor(
    private readonly transportService: TransportService,
    private readonly cargoService: CargoService,
  ) {}

  /**
   * Resuelve el problema dual de optimización ferroviaria
   * 1. Resuelve el problema de transporte (Método de Vogel)
   * 2. Para cada ruta activa, resuelve el problema de carga (Mochila 0/1)
   * 3. Calcula beneficio neto total
   */
  solveIntegratedProblem(
    problem: IntegratedProblemDto,
  ): IntegratedSolutionDto {
    // Validar entrada
    this.validateIntegratedProblem(problem);

    // Paso 1: Resolver problema de transporte
    const transportSolution = this.transportService.solve(
      problem.transportProblem,
    );

    // Paso 2: Optimizar carga para cada ruta activa
    const routeOptimizations: RouteOptimization[] = [];
    let totalCargoProfit = 0;

    for (const detail of transportSolution.allocationDetails) {
      if (detail.quantity > 0) {
        // Buscar configuración de carga para esta ruta
        const cargoConfig = problem.routeCargoConfigs.find(
          (config) =>
            config.origin === detail.origin &&
            config.destination === detail.destination,
        );

        let cargoOptimization: KnapsackSolutionDto | undefined = undefined;
        let cargoProfit = 0;

        if (cargoConfig && cargoConfig.availableItems.length > 0) {
          // Resolver problema de mochila para esta ruta
          const knapsackProblem: KnapsackProblemDto = {
            capacity: cargoConfig.capacity,
            items: cargoConfig.availableItems,
          };

          cargoOptimization = this.cargoService.solve(knapsackProblem);
          cargoProfit = cargoOptimization.totalProfit;
          totalCargoProfit += cargoProfit;
        }

        const netProfit = cargoProfit - detail.totalCost;

        routeOptimizations.push({
          origin: detail.origin,
          destination: detail.destination,
          quantity: detail.quantity,
          transportCost: detail.totalCost,
          cargoOptimization,
          netProfit,
        });
      }
    }

    // Calcular totales
    const totalTransportCost = transportSolution.totalCost;
    const totalNetProfit = totalCargoProfit - totalTransportCost;
    const activeRoutes = routeOptimizations.length;

    const summary = this.generateSummary(
      activeRoutes,
      totalTransportCost,
      totalCargoProfit,
      totalNetProfit,
    );

    return {
      transportSolution,
      routeOptimizations,
      totalTransportCost,
      totalCargoProfit,
      totalNetProfit,
      activeRoutes,
      summary,
    };
  }

  /**
   * Obtiene un resumen de la optimización sin resolver el problema completo
   */
  getOptimizationSummary(problem: IntegratedProblemDto): any {
    const { transportProblem, routeCargoConfigs } = problem;

    const totalSupply = transportProblem.origins.reduce(
      (sum, o) => sum + o.supply,
      0,
    );
    const totalDemand = transportProblem.destinations.reduce(
      (sum, d) => sum + d.demand,
      0,
    );

    const totalAvailableItems = routeCargoConfigs.reduce(
      (sum, config) => sum + config.availableItems.length,
      0,
    );

    const totalPotentialProfit = routeCargoConfigs.reduce((sum, config) => {
      const routeProfit = config.availableItems.reduce(
        (itemSum, item) => itemSum + item.profit,
        0,
      );
      return sum + routeProfit;
    }, 0);

    return {
      problemDimensions: {
        origins: transportProblem.origins.length,
        destinations: transportProblem.destinations.length,
        totalSupply,
        totalDemand,
        isBalanced: totalSupply === totalDemand,
      },
      cargoInformation: {
        routesWithCargo: routeCargoConfigs.length,
        totalAvailableItems,
        totalPotentialProfit,
      },
      recommendation:
        'Use el endpoint /solve-complete para obtener la solución optimizada',
    };
  }

  /**
   * Analiza la eficiencia de cada ruta potencial
   */
  analyzeRouteEfficiency(problem: IntegratedProblemDto): any[] {
    const transportSolution = this.transportService.solve(
      problem.transportProblem,
    );

    const routeAnalysis = transportSolution.allocationDetails.map((detail) => {
      const cargoConfig = problem.routeCargoConfigs.find(
        (config) =>
          config.origin === detail.origin &&
          config.destination === detail.destination,
      );

      let potentialProfit = 0;
      let optimalProfit = 0;

      if (cargoConfig) {
        potentialProfit = cargoConfig.availableItems.reduce(
          (sum, item) => sum + item.profit,
          0,
        );

        if (cargoConfig.availableItems.length > 0) {
          const knapsackSolution = this.cargoService.solve({
            capacity: cargoConfig.capacity,
            items: cargoConfig.availableItems,
          });
          optimalProfit = knapsackSolution.totalProfit;
        }
      }

      const netProfit = optimalProfit - detail.totalCost;
      const efficiency = detail.totalCost > 0 ? netProfit / detail.totalCost : 0;

      return {
        origin: detail.origin,
        destination: detail.destination,
        transportCost: detail.totalCost,
        optimalCargoProfit: optimalProfit,
        potentialCargoProfit: potentialProfit,
        netProfit,
        efficiency,
        isProfit: netProfit > 0,
      };
    });

    return routeAnalysis.sort((a, b) => b.efficiency - a.efficiency);
  }

  /**
   * Genera un resumen textual de la solución
   */
  private generateSummary(
    activeRoutes: number,
    totalCost: number,
    totalProfit: number,
    netProfit: number,
  ): string {
    const profitMargin = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;

    return `Optimización completada: ${activeRoutes} rutas activas. ` +
      `Costo de transporte: $${totalCost.toFixed(2)}, ` +
      `Beneficio de carga: $${totalProfit.toFixed(2)}, ` +
      `Beneficio neto: $${netProfit.toFixed(2)} ` +
      `(Margen: ${profitMargin.toFixed(2)}%)`;
  }

  /**
   * Valida que el problema integrado esté bien formado
   */
  private validateIntegratedProblem(problem: IntegratedProblemDto): void {
    if (!problem.transportProblem) {
      throw new BadRequestException(
        'Debe proporcionar un problema de transporte',
      );
    }

    if (!problem.routeCargoConfigs || problem.routeCargoConfigs.length === 0) {
      throw new BadRequestException(
        'Debe proporcionar al menos una configuración de carga',
      );
    }

    // Validar que las rutas de carga correspondan a orígenes y destinos válidos
    const validOrigins = problem.transportProblem.origins.map((o) => o.name);
    const validDestinations = problem.transportProblem.destinations.map(
      (d) => d.name,
    );

    problem.routeCargoConfigs.forEach((config, index) => {
      if (!validOrigins.includes(config.origin)) {
        throw new BadRequestException(
          `La configuración de carga ${index} tiene un origen inválido: ${config.origin}`,
        );
      }

      if (!validDestinations.includes(config.destination)) {
        throw new BadRequestException(
          `La configuración de carga ${index} tiene un destino inválido: ${config.destination}`,
        );
      }
    });
  }
}
