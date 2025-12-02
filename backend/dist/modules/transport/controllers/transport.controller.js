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
exports.TransportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transport_service_1 = require("../services/transport.service");
const dto_1 = require("../dto");
let TransportController = class TransportController {
    transportService;
    constructor(transportService) {
        this.transportService = transportService;
    }
    solve(problem) {
        return this.transportService.solve(problem);
    }
    validate(problem) {
        try {
            this.transportService.solve(problem);
            const totalSupply = problem.origins.reduce((sum, o) => sum + o.supply, 0);
            const totalDemand = problem.destinations.reduce((sum, d) => sum + d.demand, 0);
            const isBalanced = totalSupply === totalDemand;
            return {
                valid: true,
                message: 'El problema es válido y puede ser resuelto',
                isBalanced,
                totalSupply,
                totalDemand,
            };
        }
        catch (error) {
            return {
                valid: false,
                message: error.message,
            };
        }
    }
};
exports.TransportController = TransportController;
__decorate([
    (0, common_1.Post)('solve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Resolver problema de transporte',
        description: 'Resuelve un problema de transporte utilizando el Método de Aproximación de Vogel (VAM) para encontrar la solución de costo mínimo',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Problema resuelto exitosamente',
        type: dto_1.TransportSolutionDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos de entrada inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TransportProblemDto]),
    __metadata("design:returntype", dto_1.TransportSolutionDto)
], TransportController.prototype, "solve", null);
__decorate([
    (0, common_1.Post)('validate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Validar problema de transporte',
        description: 'Valida que los datos del problema estén bien formados sin resolverlo',
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Problema inválido',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TransportProblemDto]),
    __metadata("design:returntype", void 0)
], TransportController.prototype, "validate", null);
exports.TransportController = TransportController = __decorate([
    (0, swagger_1.ApiTags)('transport'),
    (0, common_1.Controller)('transport'),
    __metadata("design:paramtypes", [transport_service_1.TransportService])
], TransportController);
//# sourceMappingURL=transport.controller.js.map