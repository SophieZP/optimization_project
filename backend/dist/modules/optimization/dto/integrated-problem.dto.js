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
exports.IntegratedProblemDto = exports.RouteCargoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const dto_1 = require("../../transport/dto");
const dto_2 = require("../../cargo/dto");
class RouteCargoDto {
    origin;
    destination;
    capacity;
    availableItems;
}
exports.RouteCargoDto = RouteCargoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del origen',
        example: 'Centro A',
    }),
    __metadata("design:type", String)
], RouteCargoDto.prototype, "origin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del destino',
        example: 'Ciudad X',
    }),
    __metadata("design:type", String)
], RouteCargoDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Capacidad de carga para esta ruta',
        example: 50,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RouteCargoDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Items disponibles para esta ruta',
        type: [dto_2.CargoItemDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dto_2.CargoItemDto),
    __metadata("design:type", Array)
], RouteCargoDto.prototype, "availableItems", void 0);
class IntegratedProblemDto {
    transportProblem;
    routeCargoConfigs;
}
exports.IntegratedProblemDto = IntegratedProblemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Problema de transporte (distribución). Define la red de orígenes, destinos y costos de transporte.',
        type: dto_1.TransportProblemDto,
        required: true,
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dto_1.TransportProblemDto),
    __metadata("design:type", dto_1.TransportProblemDto)
], IntegratedProblemDto.prototype, "transportProblem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Configuración de carga para cada ruta posible',
        type: [RouteCargoDto],
        example: [
            {
                origin: 'Centro A',
                destination: 'Ciudad X',
                capacity: 50,
                availableItems: [
                    { id: '1', name: 'Electrónicos', weight: 10, profit: 100 },
                ],
            },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RouteCargoDto),
    __metadata("design:type", Array)
], IntegratedProblemDto.prototype, "routeCargoConfigs", void 0);
//# sourceMappingURL=integrated-problem.dto.js.map