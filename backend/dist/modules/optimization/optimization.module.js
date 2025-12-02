"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimizationModule = void 0;
const common_1 = require("@nestjs/common");
const optimization_controller_1 = require("./controllers/optimization.controller");
const optimization_service_1 = require("./services/optimization.service");
const transport_module_1 = require("../transport/transport.module");
const cargo_module_1 = require("../cargo/cargo.module");
let OptimizationModule = class OptimizationModule {
};
exports.OptimizationModule = OptimizationModule;
exports.OptimizationModule = OptimizationModule = __decorate([
    (0, common_1.Module)({
        imports: [transport_module_1.TransportModule, cargo_module_1.CargoModule],
        controllers: [optimization_controller_1.OptimizationController],
        providers: [optimization_service_1.OptimizationService],
        exports: [optimization_service_1.OptimizationService],
    })
], OptimizationModule);
//# sourceMappingURL=optimization.module.js.map