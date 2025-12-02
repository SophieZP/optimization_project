"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CargoService = void 0;
const common_1 = require("@nestjs/common");
let CargoService = class CargoService {
    solve(problem) {
        this.validateProblem(problem);
        const { capacity, items } = problem;
        const n = items.length;
        const dp = Array(n + 1)
            .fill(0)
            .map(() => Array(capacity + 1).fill(0));
        for (let i = 1; i <= n; i++) {
            const currentItem = items[i - 1];
            const weight = Math.floor(currentItem.weight);
            const profit = currentItem.profit;
            for (let w = 0; w <= capacity; w++) {
                if (weight <= w) {
                    dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + profit);
                }
                else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        const selectedItemIds = [];
        const selectedItems = [];
        let w = capacity;
        let totalWeight = 0;
        for (let i = n; i > 0 && w > 0; i--) {
            if (dp[i][w] !== dp[i - 1][w]) {
                const item = items[i - 1];
                selectedItemIds.push(item.id);
                selectedItems.push({
                    id: item.id,
                    name: item.name,
                    weight: item.weight,
                    profit: item.profit,
                });
                totalWeight += item.weight;
                w -= Math.floor(item.weight);
            }
        }
        const totalProfit = dp[n][capacity];
        const remainingCapacity = capacity - totalWeight;
        const utilizationPercentage = (totalWeight / capacity) * 100;
        return {
            selectedItemIds,
            selectedItems,
            totalProfit,
            totalWeight,
            remainingCapacity,
            utilizationPercentage: Math.round(utilizationPercentage * 100) / 100,
            method: 'Programación Dinámica - Mochila 0/1',
        };
    }
    optimizeMultipleScenarios(problems) {
        return problems.map((problem) => this.solve(problem));
    }
    solveWithItemLimit(problem, maxItems) {
        this.validateProblem(problem);
        if (maxItems <= 0) {
            throw new common_1.BadRequestException('El límite de items debe ser mayor a cero');
        }
        const { capacity, items } = problem;
        const n = Math.min(items.length, maxItems);
        const dp = Array(n + 1)
            .fill(0)
            .map(() => Array(capacity + 1)
            .fill(0)
            .map(() => Array(maxItems + 1).fill(0)));
        for (let i = 1; i <= n; i++) {
            const currentItem = items[i - 1];
            const weight = Math.floor(currentItem.weight);
            const profit = currentItem.profit;
            for (let w = 0; w <= capacity; w++) {
                for (let k = 0; k <= maxItems; k++) {
                    if (weight <= w && k > 0) {
                        dp[i][w][k] = Math.max(dp[i - 1][w][k], dp[i - 1][w - weight][k - 1] + profit);
                    }
                    else {
                        dp[i][w][k] = dp[i - 1][w][k];
                    }
                }
            }
        }
        const selectedItemIds = [];
        const selectedItems = [];
        let w = capacity;
        let k = maxItems;
        let totalWeight = 0;
        for (let i = n; i > 0 && w > 0 && k > 0; i--) {
            if (dp[i][w][k] !== dp[i - 1][w][k]) {
                const item = items[i - 1];
                selectedItemIds.push(item.id);
                selectedItems.push({
                    id: item.id,
                    name: item.name,
                    weight: item.weight,
                    profit: item.profit,
                });
                totalWeight += item.weight;
                w -= Math.floor(item.weight);
                k--;
            }
        }
        const totalProfit = dp[n][capacity][maxItems];
        const remainingCapacity = capacity - totalWeight;
        const utilizationPercentage = (totalWeight / capacity) * 100;
        return {
            selectedItemIds,
            selectedItems,
            totalProfit,
            totalWeight,
            remainingCapacity,
            utilizationPercentage: Math.round(utilizationPercentage * 100) / 100,
            method: `Programación Dinámica - Mochila 0/1 (máx ${maxItems} items)`,
        };
    }
    calculateEfficiency(problem) {
        const itemsWithEfficiency = problem.items.map((item) => ({
            ...item,
            efficiency: item.profit / item.weight,
        }));
        return itemsWithEfficiency.sort((a, b) => b.efficiency - a.efficiency);
    }
    validateProblem(problem) {
        const { capacity, items } = problem;
        if (capacity <= 0) {
            throw new common_1.BadRequestException('La capacidad debe ser mayor a cero');
        }
        if (items.length === 0) {
            throw new common_1.BadRequestException('Debe haber al menos un item disponible');
        }
        items.forEach((item, index) => {
            if (item.weight <= 0) {
                throw new common_1.BadRequestException(`El peso del item ${index} debe ser mayor a cero`);
            }
            if (item.profit < 0) {
                throw new common_1.BadRequestException(`El beneficio del item ${index} no puede ser negativo`);
            }
        });
        const ids = items.map((item) => item.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
            throw new common_1.BadRequestException('Los IDs de los items deben ser únicos');
        }
    }
};
exports.CargoService = CargoService;
exports.CargoService = CargoService = __decorate([
    (0, common_1.Injectable)()
], CargoService);
//# sourceMappingURL=cargo.service.js.map