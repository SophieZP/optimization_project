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
exports.CargoItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CargoItemDto {
    id;
    name;
    weight;
    profit;
    description;
}
exports.CargoItemDto = CargoItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador único del item',
        example: '1',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CargoItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre o descripción de la mercancía',
        example: 'Electrónicos',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CargoItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Peso o volumen de la mercancía',
        example: 10,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CargoItemDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Beneficio o ganancia obtenida por transportar la mercancía',
        example: 100,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CargoItemDto.prototype, "profit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Información adicional sobre el item',
        required: false,
        example: 'Productos electrónicos de alto valor',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CargoItemDto.prototype, "description", void 0);
//# sourceMappingURL=cargo-item.dto.js.map