"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBalancedProblem = void 0;
const class_validator_1 = require("class-validator");
let IsBalancedProblem = class IsBalancedProblem {
    validate(value, args) {
        const object = args.object;
        if (!object.origins || !object.destinations) {
            return false;
        }
        const totalSupply = object.origins.reduce((sum, o) => sum + (o.supply || 0), 0);
        const totalDemand = object.destinations.reduce((sum, d) => sum + (d.demand || 0), 0);
        return totalSupply > 0 && totalDemand > 0;
    }
    defaultMessage(args) {
        return 'El problema debe tener oferta y demanda válidas (mayores a cero)';
    }
};
exports.IsBalancedProblem = IsBalancedProblem;
exports.IsBalancedProblem = IsBalancedProblem = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isBalancedProblem', async: false })
], IsBalancedProblem);
//# sourceMappingURL=is-balanced-problem.decorator.js.map