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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const optimization_service_1 = require("../services/optimization.service");
const dto_1 = require("../dto");
let OptimizationController = class OptimizationController {
    optimizationService;
    constructor(optimizationService) {
        this.optimizationService = optimizationService;
    }
    solveComplete(problem) {
        return this.optimizationService.solveIntegratedProblem(problem);
    }
    getSummary(problem) {
        return this.optimizationService.getOptimizationSummary(problem);
    }
    analyzeEfficiency(problem) {
        return this.optimizationService.analyzeRouteEfficiency(problem);
    }
};
exports.OptimizationController = OptimizationController;
__decorate([
    (0, common_1.Post)('solve-complete'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Resolver problema dual completo',
        description: 'Resuelve el problema integrado de transporte y carga. ' +
            'Primero optimiza las rutas de distribución usando el Método de Vogel, ' +
            'luego optimiza la carga de cada ruta usando el algoritmo de la Mochila 0/1',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Problema dual resuelto exitosamente',
        type: dto_1.IntegratedSolutionDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IntegratedProblemDto]),
    __metadata("design:returntype", dto_1.IntegratedSolutionDto)
], OptimizationController.prototype, "solveComplete", null);
__decorate([
    (0, common_1.Post)('summary'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener resumen del problema',
        description: 'Analiza el problema sin resolverlo completamente, proporcionando información sobre dimensiones y potencial',
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IntegratedProblemDto]),
    __metadata("design:returntype", Object)
], OptimizationController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Post)('analyze-efficiency'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Analizar eficiencia de rutas',
        description: 'Analiza la eficiencia (beneficio neto / costo) de cada ruta potencial',
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IntegratedProblemDto]),
    __metadata("design:returntype", Array)
], OptimizationController.prototype, "analyzeEfficiency", null);
exports.OptimizationController = OptimizationController = __decorate([
    (0, swagger_1.ApiTags)('optimization'),
    (0, common_1.Controller)('optimization'),
    __metadata("design:paramtypes", [optimization_service_1.OptimizationService])
], OptimizationController);
//# sourceMappingURL=optimization.controller.js.map