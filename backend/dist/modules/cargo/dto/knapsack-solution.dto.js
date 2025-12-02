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
exports.KnapsackSolutionDto = exports.SelectedItemDetail = void 0;
const swagger_1 = require("@nestjs/swagger");
class SelectedItemDetail {
    id;
    name;
    weight;
    profit;
}
exports.SelectedItemDetail = SelectedItemDetail;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del item seleccionado', example: '1' }),
    __metadata("design:type", String)
], SelectedItemDetail.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del item', example: 'Electrónicos' }),
    __metadata("design:type", String)
], SelectedItemDetail.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Peso del item', example: 10 }),
    __metadata("design:type", Number)
], SelectedItemDetail.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Beneficio del item', example: 100 }),
    __metadata("design:type", Number)
], SelectedItemDetail.prototype, "profit", void 0);
class KnapsackSolutionDto {
    selectedItemIds;
    selectedItems;
    totalProfit;
    totalWeight;
    utilizationPercentage;
    remainingCapacity;
    method;
}
exports.KnapsackSolutionDto = KnapsackSolutionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'IDs de los items seleccionados para transportar',
        example: ['1', '3'],
    }),
    __metadata("design:type", Array)
], KnapsackSolutionDto.prototype, "selectedItemIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Detalles de los items seleccionados',
        type: [SelectedItemDetail],
    }),
    __metadata("design:type", Array)
], KnapsackSolutionDto.prototype, "selectedItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Beneficio total obtenido',
        example: 190,
    }),
    __metadata("design:type", Number)
], KnapsackSolutionDto.prototype, "totalProfit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Peso total de la carga seleccionada',
        example: 25,
    }),
    __metadata("design:type", Number)
], KnapsackSolutionDto.prototype, "totalWeight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Capacidad utilizada (porcentaje)',
        example: 50,
    }),
    __metadata("design:type", Number)
], KnapsackSolutionDto.prototype, "utilizationPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Capacidad restante',
        example: 25,
    }),
    __metadata("design:type", Number)
], KnapsackSolutionDto.prototype, "remainingCapacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Método utilizado para resolver el problema',
        example: 'Programación Dinámica - Mochila 0/1',
    }),
    __metadata("design:type", String)
], KnapsackSolutionDto.prototype, "method", void 0);
//# sourceMappingURL=knapsack-solution.dto.js.map