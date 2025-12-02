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
exports.IntegratedSolutionDto = exports.RouteOptimization = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../transport/dto");
const dto_2 = require("../../cargo/dto");
class RouteOptimization {
    origin;
    destination;
    quantity;
    transportCost;
    cargoOptimization;
    netProfit;
}
exports.RouteOptimization = RouteOptimization;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Origen de la ruta', example: 'Centro A' }),
    __metadata("design:type", String)
], RouteOptimization.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Destino de la ruta', example: 'Ciudad X' }),
    __metadata("design:type", String)
], RouteOptimization.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad a transportar en esta ruta',
        example: 50,
    }),
    __metadata("design:type", Number)
], RouteOptimization.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Costo de transporte', example: 500 }),
    __metadata("design:type", Number)
], RouteOptimization.prototype, "transportCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optimización de carga para esta ruta',
        type: dto_2.KnapsackSolutionDto,
        required: false,
    }),
    __metadata("design:type", dto_2.KnapsackSolutionDto)
], RouteOptimization.prototype, "cargoOptimization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Beneficio neto de esta ruta (beneficio carga - costo transporte)',
        example: 400,
    }),
    __metadata("design:type", Number)
], RouteOptimization.prototype, "netProfit", void 0);
class IntegratedSolutionDto {
    transportSolution;
    routeOptimizations;
    totalTransportCost;
    totalCargoProfit;
    totalNetProfit;
    activeRoutes;
    summary;
}
exports.IntegratedSolutionDto = IntegratedSolutionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Solución del problema de transporte',
        type: dto_1.TransportSolutionDto,
    }),
    __metadata("design:type", dto_1.TransportSolutionDto)
], IntegratedSolutionDto.prototype, "transportSolution", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Optimización de cada ruta activa',
        type: [RouteOptimization],
    }),
    __metadata("design:type", Array)
], IntegratedSolutionDto.prototype, "routeOptimizations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Costo total de transporte',
        example: 2500,
    }),
    __metadata("design:type", Number)
], IntegratedSolutionDto.prototype, "totalTransportCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Beneficio total de todas las cargas',
        example: 5000,
    }),
    __metadata("design:type", Number)
], IntegratedSolutionDto.prototype, "totalCargoProfit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Beneficio neto total (beneficio - costos)',
        example: 2500,
    }),
    __metadata("design:type", Number)
], IntegratedSolutionDto.prototype, "totalNetProfit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de rutas activas',
        example: 5,
    }),
    __metadata("design:type", Number)
], IntegratedSolutionDto.prototype, "activeRoutes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Resumen de la optimización integrada',
        example: 'Problema dual resuelto exitosamente',
    }),
    __metadata("design:type", String)
], IntegratedSolutionDto.prototype, "summary", void 0);
//# sourceMappingURL=integrated-solution.dto.js.map