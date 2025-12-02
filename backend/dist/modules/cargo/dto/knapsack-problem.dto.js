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
exports.KnapsackProblemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const cargo_item_dto_1 = require("./cargo-item.dto");
const decorators_1 = require("../../../common/decorators");
class KnapsackProblemDto {
    capacity;
    items;
}
exports.KnapsackProblemDto = KnapsackProblemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Capacidad máxima de carga del tren (en unidades de peso o volumen)',
        example: 50,
        minimum: 0,
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], KnapsackProblemDto.prototype, "capacity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de mercancías disponibles para transportar',
        type: [cargo_item_dto_1.CargoItemDto],
        example: [
            { id: '1', name: 'Electrónicos', weight: 10, profit: 100 },
            { id: '2', name: 'Textiles', weight: 20, profit: 150 },
            { id: '3', name: 'Alimentos', weight: 15, profit: 90 },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => cargo_item_dto_1.CargoItemDto),
    (0, class_validator_1.Validate)(decorators_1.HasUniqueIds),
    __metadata("design:type", Array)
], KnapsackProblemDto.prototype, "items", void 0);
//# sourceMappingURL=knapsack-problem.dto.js.map