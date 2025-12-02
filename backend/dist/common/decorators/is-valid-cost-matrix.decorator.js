"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidCostMatrix = void 0;
const class_validator_1 = require("class-validator");
let IsValidCostMatrix = class IsValidCostMatrix {
    validate(costs, args) {
        if (!Array.isArray(costs) || costs.length === 0) {
            return false;
        }
        const numCols = costs[0].length;
        for (const row of costs) {
            if (!Array.isArray(row) || row.length !== numCols) {
                return false;
            }
            for (const cost of row) {
                if (typeof cost !== 'number' || cost < 0 || !isFinite(cost)) {
                    return false;
                }
            }
        }
        return true;
    }
    defaultMessage(args) {
        return 'La matriz de costos debe ser rectangular y contener solo números no negativos';
    }
};
exports.IsValidCostMatrix = IsValidCostMatrix;
exports.IsValidCostMatrix = IsValidCostMatrix = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isValidCostMatrix', async: false })
], IsValidCostMatrix);
//# sourceMappingURL=is-valid-cost-matrix.decorator.js.map