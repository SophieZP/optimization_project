"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transportDatasetUnbalanced = exports.transportDatasetSmall = exports.transportDatasetExample = void 0;
exports.transportDatasetExample = {
    origins: [
        { name: 'Centro de Distribución Norte', supply: 200 },
        { name: 'Centro de Distribución Sur', supply: 300 },
        { name: 'Centro de Distribución Este', supply: 250 },
    ],
    destinations: [
        { name: 'Ciudad Alpha', demand: 150 },
        { name: 'Ciudad Beta', demand: 200 },
        { name: 'Ciudad Gamma', demand: 180 },
        { name: 'Ciudad Delta', demand: 220 },
    ],
    costs: [
        [10, 15, 20, 12],
        [18, 10, 14, 16],
        [12, 20, 11, 15],
    ],
};
exports.transportDatasetSmall = {
    origins: [
        { name: 'Origen A', supply: 100 },
        { name: 'Origen B', supply: 150 },
    ],
    destinations: [
        { name: 'Destino X', demand: 120 },
        { name: 'Destino Y', demand: 130 },
    ],
    costs: [
        [10, 20],
        [15, 10],
    ],
};
exports.transportDatasetUnbalanced = {
    origins: [
        { name: 'Almacén 1', supply: 300 },
        { name: 'Almacén 2', supply: 400 },
    ],
    destinations: [
        { name: 'Tienda 1', demand: 250 },
        { name: 'Tienda 2', demand: 300 },
    ],
    costs: [
        [8, 12],
        [10, 9],
    ],
};
//# sourceMappingURL=transport.dataset.js.map