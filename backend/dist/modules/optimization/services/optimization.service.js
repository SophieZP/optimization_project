"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizationService = void 0;
const common_1 = require("@nestjs/common");
const transport_service_1 = require("../../transport/services/transport.service");
const cargo_service_1 = require("../../cargo/services/cargo.service");
let OptimizationService = class OptimizationService {
    transportService;
    cargoService;
    constructor(transportService, cargoService) {
        this.transportService = transportService;
        this.cargoService = cargoService;
    }
    solveIntegratedProblem(problem) {
        this.validateIntegratedProblem(problem);
        const transportSolution = this.transportService.solve(problem.transportProblem);
        const routeOptimizations = [];
        let totalCargoProfit = 0;
        for (const detail of transportSolution.allocationDetails) {
            if (detail.quantity > 0) {
                const cargoConfig = problem.routeCargoConfigs.find((config) => config.origin === detail.origin &&
                    config.destination === detail.destination);
                let cargoOptimization = undefined;
                let cargoProfit = 0;
                if (cargoConfig && cargoConfig.availableItems.length > 0) {
                    const knapsackProblem = {
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
        const totalTransportCost = transportSolution.totalCost;
        const totalNetProfit = totalCargoProfit - totalTransportCost;
        const activeRoutes = routeOptimizations.length;
        const summary = this.generateSummary(activeRoutes, totalTransportCost, totalCargoProfit, totalNetProfit);
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
    getOptimizationSummary(problem) {
        const { transportProblem, routeCargoConfigs } = problem;
        const totalSupply = transportProblem.origins.reduce((sum, o) => sum + o.supply, 0);
        const totalDemand = transportProblem.destinations.reduce((sum, d) => sum + d.demand, 0);
        const totalAvailableItems = routeCargoConfigs.reduce((sum, config) => sum + config.availableItems.length, 0);
        const totalPotentialProfit = routeCargoConfigs.reduce((sum, config) => {
            const routeProfit = config.availableItems.reduce((itemSum, item) => itemSum + item.profit, 0);
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
            recommendation: 'Use el endpoint /solve-complete para obtener la solución optimizada',
        };
    }
    analyzeRouteEfficiency(problem) {
        const transportSolution = this.transportService.solve(problem.transportProblem);
        const routeAnalysis = transportSolution.allocationDetails.map((detail) => {
            const cargoConfig = problem.routeCargoConfigs.find((config) => config.origin === detail.origin &&
                config.destination === detail.destination);
            let potentialProfit = 0;
            let optimalProfit = 0;
            if (cargoConfig) {
                potentialProfit = cargoConfig.availableItems.reduce((sum, item) => sum + item.profit, 0);
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
    generateSummary(activeRoutes, totalCost, totalProfit, netProfit) {
        const profitMargin = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
        return `Optimización completada: ${activeRoutes} rutas activas. ` +
            `Costo de transporte: $${totalCost.toFixed(2)}, ` +
            `Beneficio de carga: $${totalProfit.toFixed(2)}, ` +
            `Beneficio neto: $${netProfit.toFixed(2)} ` +
            `(Margen: ${profitMargin.toFixed(2)}%)`;
    }
    validateIntegratedProblem(problem) {
        if (!problem.transportProblem) {
            throw new common_1.BadRequestException('Debe proporcionar un problema de transporte');
        }
        if (!problem.routeCargoConfigs || problem.routeCargoConfigs.length === 0) {
            throw new common_1.BadRequestException('Debe proporcionar al menos una configuración de carga');
        }
        const validOrigins = problem.transportProblem.origins.map((o) => o.name);
        const validDestinations = problem.transportProblem.destinations.map((d) => d.name);
        problem.routeCargoConfigs.forEach((config, index) => {
            if (!validOrigins.includes(config.origin)) {
                throw new common_1.BadRequestException(`La configuración de carga ${index} tiene un origen inválido: ${config.origin}`);
            }
            if (!validDestinations.includes(config.destination)) {
                throw new common_1.BadRequestException(`La configuración de carga ${index} tiene un destino inválido: ${config.destination}`);
            }
        });
    }
};
exports.OptimizationService = OptimizationService;
exports.OptimizationService = OptimizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transport_service_1.TransportService,
        cargo_service_1.CargoService])
], OptimizationService);
//# sourceMappingURL=optimization.service.js.map