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
exports.CargoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cargo_service_1 = require("../services/cargo.service");
const dto_1 = require("../dto");
let CargoController = class CargoController {
    cargoService;
    constructor(cargoService) {
        this.cargoService = cargoService;
    }
    solve(problem) {
        return this.cargoService.solve(problem);
    }
    solveWithLimit(problem, maxItems) {
        return this.cargoService.solveWithItemLimit(problem, Number(maxItems));
    }
    optimizeMultiple(problems) {
        return this.cargoService.optimizeMultipleScenarios(problems);
    }
    calculateEfficiency(problem) {
        return this.cargoService.calculateEfficiency(problem);
    }
};
exports.CargoController = CargoController;
__decorate([
    (0, common_1.Post)('solve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Resolver problema de la mochila 0/1',
        description: 'Resuelve el problema de optimización de carga usando Programación Dinámica para maximizar el beneficio sin exceder la capacidad',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Problema resuelto exitosamente',
        type: dto_1.KnapsackSolutionDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.KnapsackProblemDto]),
    __metadata("design:returntype", dto_1.KnapsackSolutionDto)
], CargoController.prototype, "solve", null);
__decorate([
    (0, common_1.Post)('solve-with-limit'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Resolver mochila con límite de items',
        description: 'Resuelve el problema de la mochila con una restricción adicional en el número máximo de items a seleccionar',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'maxItems',
        required: true,
        type: Number,
        description: 'Número máximo de items a seleccionar',
        example: 3,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Problema resuelto exitosamente',
        type: dto_1.KnapsackSolutionDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('maxItems')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.KnapsackProblemDto, Number]),
    __metadata("design:returntype", dto_1.KnapsackSolutionDto)
], CargoController.prototype, "solveWithLimit", null);
__decorate([
    (0, common_1.Post)('optimize'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Optimizar múltiples escenarios',
        description: 'Resuelve múltiples problemas de mochila en paralelo para diferentes configuraciones',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Escenarios optimizados exitosamente',
        type: [dto_1.KnapsackSolutionDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Array)
], CargoController.prototype, "optimizeMultiple", null);
__decorate([
    (0, common_1.Post)('efficiency'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Calcular eficiencia de items',
        description: 'Calcula la eficiencia (beneficio/peso) de cada item y los ordena de mayor a menor',
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.KnapsackProblemDto]),
    __metadata("design:returntype", Array)
], CargoController.prototype, "calculateEfficiency", null);
exports.CargoController = CargoController = __decorate([
    (0, swagger_1.ApiTags)('cargo'),
    (0, common_1.Controller)('cargo'),
    __metadata("design:paramtypes", [cargo_service_1.CargoService])
], CargoController);
//# sourceMappingURL=cargo.controller.js.map