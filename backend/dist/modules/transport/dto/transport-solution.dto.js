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
exports.TransportSolutionDto = exports.AllocationDetail = void 0;
const swagger_1 = require("@nestjs/swagger");
class AllocationDetail {
    origin;
    destination;
    quantity;
    unitCost;
    totalCost;
}
exports.AllocationDetail = AllocationDetail;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del origen', example: 'Origen A' }),
    __metadata("design:type", String)
], AllocationDetail.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del destino', example: 'Destino X' }),
    __metadata("design:type", String)
], AllocationDetail.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cantidad asignada', example: 50 }),
    __metadata("design:type", Number)
], AllocationDetail.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Costo unitario', example: 10 }),
    __metadata("design:type", Number)
], AllocationDetail.prototype, "unitCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Costo total de esta asignación', example: 500 }),
    __metadata("design:type", Number)
], AllocationDetail.prototype, "totalCost", void 0);
class TransportSolutionDto {
    allocations;
    totalCost;
    allocationDetails;
    method;
    isBalanced;
}
exports.TransportSolutionDto = TransportSolutionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Matriz de asignaciones [orígenes][destinos]',
        example: [
            [50, 50],
            [30, 120],
        ],
    }),
    __metadata("design:type", Array)
], TransportSolutionDto.prototype, "allocations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Costo total de transporte',
        example: 2500,
    }),
    __metadata("design:type", Number)
], TransportSolutionDto.prototype, "totalCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detalles de las asignaciones realizadas',
        type: [AllocationDetail],
    }),
    __metadata("design:type", Array)
], TransportSolutionDto.prototype, "allocationDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Método utilizado para resolver el problema',
        example: 'Método de Aproximación de Vogel',
    }),
    __metadata("design:type", String)
], TransportSolutionDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si el problema está balanceado',
        example: true,
    }),
    __metadata("design:type", Boolean)
], TransportSolutionDto.prototype, "isBalanced", void 0);
//# sourceMappingURL=transport-solution.dto.js.map