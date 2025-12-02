"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportService = void 0;
const common_1 = require("@nestjs/common");
let TransportService = class TransportService {
    solve(problem) {
        this.validateProblem(problem);
        const { origins, destinations, costs } = problem;
        const numOrigins = origins.length;
        const numDestinations = destinations.length;
        const supply = origins.map((o) => o.supply);
        const demand = destinations.map((d) => d.demand);
        const costMatrix = costs.map((row) => [...row]);
        const totalSupply = supply.reduce((sum, s) => sum + s, 0);
        const totalDemand = demand.reduce((sum, d) => sum + d, 0);
        const isBalanced = totalSupply === totalDemand;
        if (!isBalanced) {
            this.balanceProblem(supply, demand, costMatrix);
        }
        const allocations = Array(numOrigins)
            .fill(0)
            .map(() => Array(numDestinations).fill(0));
        this.vogelApproximationMethod(supply, demand, costMatrix, allocations, numOrigins, numDestinations);
        const { totalCost, allocationDetails } = this.calculateResults(allocations, costs, origins, destinations);
        return {
            allocations,
            totalCost,
            allocationDetails,
            method: 'Método de Aproximación de Vogel (VAM)',
            isBalanced,
        };
    }
    vogelApproximationMethod(supply, demand, costs, allocations, numOrigins, numDestinations) {
        const rowActive = Array(numOrigins).fill(true);
        const colActive = Array(numDestinations).fill(true);
        while (this.hasActiveSupplyOrDemand(supply, demand)) {
            const rowPenalties = this.calculateRowPenalties(costs, colActive, rowActive, numOrigins, numDestinations);
            const colPenalties = this.calculateColPenalties(costs, rowActive, colActive, numOrigins, numDestinations);
            const maxRowPenalty = Math.max(...rowPenalties.filter((p) => p >= 0));
            const maxColPenalty = Math.max(...colPenalties.filter((p) => p >= 0));
            let row, col;
            if (maxRowPenalty >= maxColPenalty) {
                row = rowPenalties.indexOf(maxRowPenalty);
                col = this.findMinCostInRow(costs[row], colActive);
            }
            else {
                col = colPenalties.indexOf(maxColPenalty);
                row = this.findMinCostInCol(costs, col, rowActive);
            }
            const allocation = Math.min(supply[row], demand[col]);
            allocations[row][col] = allocation;
            supply[row] -= allocation;
            demand[col] -= allocation;
            if (supply[row] === 0)
                rowActive[row] = false;
            if (demand[col] === 0)
                colActive[col] = false;
        }
    }
    calculateRowPenalties(costs, colActive, rowActive, numOrigins, numDestinations) {
        const penalties = [];
        for (let i = 0; i < numOrigins; i++) {
            if (!rowActive[i]) {
                penalties.push(-1);
                continue;
            }
            const activeCosts = costs[i]
                .map((cost, j) => (colActive[j] ? cost : Infinity))
                .filter((cost) => cost !== Infinity)
                .sort((a, b) => a - b);
            if (activeCosts.length >= 2) {
                penalties.push(activeCosts[1] - activeCosts[0]);
            }
            else if (activeCosts.length === 1) {
                penalties.push(activeCosts[0]);
            }
            else {
                penalties.push(-1);
            }
        }
        return penalties;
    }
    calculateColPenalties(costs, rowActive, colActive, numOrigins, numDestinations) {
        const penalties = [];
        for (let j = 0; j < numDestinations; j++) {
            if (!colActive[j]) {
                penalties.push(-1);
                continue;
            }
            const activeCosts = [];
            for (let i = 0; i < numOrigins; i++) {
                if (rowActive[i]) {
                    activeCosts.push(costs[i][j]);
                }
            }
            activeCosts.sort((a, b) => a - b);
            if (activeCosts.length >= 2) {
                penalties.push(activeCosts[1] - activeCosts[0]);
            }
            else if (activeCosts.length === 1) {
                penalties.push(activeCosts[0]);
            }
            else {
                penalties.push(-1);
            }
        }
        return penalties;
    }
    findMinCostInRow(row, colActive) {
        let minCost = Infinity;
        let minCol = -1;
        for (let j = 0; j < row.length; j++) {
            if (colActive[j] && row[j] < minCost) {
                minCost = row[j];
                minCol = j;
            }
        }
        return minCol;
    }
    findMinCostInCol(costs, col, rowActive) {
        let minCost = Infinity;
        let minRow = -1;
        for (let i = 0; i < costs.length; i++) {
            if (rowActive[i] && costs[i][col] < minCost) {
                minCost = costs[i][col];
                minRow = i;
            }
        }
        return minRow;
    }
    hasActiveSupplyOrDemand(supply, demand) {
        return supply.some((s) => s > 0) || demand.some((d) => d > 0);
    }
    balanceProblem(supply, demand, costs) {
        const totalSupply = supply.reduce((sum, s) => sum + s, 0);
        const totalDemand = demand.reduce((sum, d) => sum + d, 0);
        if (totalSupply > totalDemand) {
            demand.push(totalSupply - totalDemand);
            costs.forEach((row) => row.push(0));
        }
        else if (totalDemand > totalSupply) {
            supply.push(totalDemand - totalSupply);
            costs.push(Array(demand.length).fill(0));
        }
    }
    calculateResults(allocations, costs, origins, destinations) {
        let totalCost = 0;
        const allocationDetails = [];
        for (let i = 0; i < allocations.length; i++) {
            for (let j = 0; j < allocations[i].length; j++) {
                if (allocations[i][j] > 0) {
                    const quantity = allocations[i][j];
                    const unitCost = costs[i][j];
                    const cost = quantity * unitCost;
                    totalCost += cost;
                    allocationDetails.push({
                        origin: origins[i]?.name || `Origen ${i + 1}`,
                        destination: destinations[j]?.name || `Destino ${j + 1}`,
                        quantity,
                        unitCost,
                        totalCost: cost,
                    });
                }
            }
        }
        return { totalCost, allocationDetails };
    }
    validateProblem(problem) {
        const { origins, destinations, costs } = problem;
        if (origins.length === 0) {
            throw new common_1.BadRequestException('Debe haber al menos un origen');
        }
        if (destinations.length === 0) {
            throw new common_1.BadRequestException('Debe haber al menos un destino');
        }
        if (costs.length !== origins.length) {
            throw new common_1.BadRequestException('La matriz de costos debe tener una fila por cada origen');
        }
        costs.forEach((row, i) => {
            if (row.length !== destinations.length) {
                throw new common_1.BadRequestException(`La fila ${i} de costos debe tener una columna por cada destino`);
            }
        });
        origins.forEach((origin, i) => {
            if (origin.supply < 0) {
                throw new common_1.BadRequestException(`La oferta del origen ${i} no puede ser negativa`);
            }
        });
        destinations.forEach((dest, i) => {
            if (dest.demand < 0) {
                throw new common_1.BadRequestException(`La demanda del destino ${i} no puede ser negativa`);
            }
        });
    }
};
exports.TransportService = TransportService;
exports.TransportService = TransportService = __decorate([
    (0, common_1.Injectable)()
], TransportService);
//# sourceMappingURL=transport.service.js.map