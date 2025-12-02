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
exports.TransportProblemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const origin_dto_1 = require("./origin.dto");
const destination_dto_1 = require("./destination.dto");
const decorators_1 = require("../../../common/decorators");
class TransportProblemDto {
    origins;
    destinations;
    costs;
}
exports.TransportProblemDto = TransportProblemDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de orígenes con sus capacidades',
        type: [origin_dto_1.OriginDto],
        example: [
            { name: 'Origen A', supply: 100 },
            { name: 'Origen B', supply: 150 },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => origin_dto_1.OriginDto),
    __metadata("design:type", Array)
], TransportProblemDto.prototype, "origins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de destinos con sus demandas',
        type: [destination_dto_1.DestinationDto],
        example: [
            { name: 'Destino X', demand: 80 },
            { name: 'Destino Y', demand: 120 },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => destination_dto_1.DestinationDto),
    __metadata("design:type", Array)
], TransportProblemDto.prototype, "destinations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Matriz de costos de transporte [orígenes][destinos]. Cada fila representa un origen y cada columna un destino.',
        example: [
            [10, 20],
            [15, 10],
        ],
        required: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.Validate)(decorators_1.IsValidCostMatrix),
    __metadata("design:type", Array)
], TransportProblemDto.prototype, "costs", void 0);
//# sourceMappingURL=transport-problem.dto.js.map