"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CargoModule = void 0;
const common_1 = require("@nestjs/common");
const cargo_controller_1 = require("./controllers/cargo.controller");
const cargo_service_1 = require("./services/cargo.service");
let CargoModule = class CargoModule {
};
exports.CargoModule = CargoModule;
exports.CargoModule = CargoModule = __decorate([
    (0, common_1.Module)({
        controllers: [cargo_controller_1.CargoController],
        providers: [cargo_service_1.CargoService],
        exports: [cargo_service_1.CargoService],
    })
], CargoModule);
//# sourceMappingURL=cargo.module.js.map