"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integratedDatasetSmall = exports.integratedDatasetExample = void 0;
const transport_dataset_1 = require("./transport.dataset");
exports.integratedDatasetExample = {
    transportProblem: transport_dataset_1.transportDatasetExample,
    routeCargoConfigs: [
        {
            origin: 'Centro de Distribución Norte',
            destination: 'Ciudad Alpha',
            capacity: 80,
            availableItems: [
                { id: '1', name: 'Electrónicos', weight: 20, profit: 300 },
                { id: '2', name: 'Textiles', weight: 30, profit: 250 },
                { id: '3', name: 'Alimentos', weight: 25, profit: 200 },
            ],
        },
        {
            origin: 'Centro de Distribución Norte',
            destination: 'Ciudad Beta',
            capacity: 100,
            availableItems: [
                { id: '4', name: 'Maquinaria', weight: 40, profit: 450 },
                { id: '5', name: 'Químicos', weight: 15, profit: 180 },
            ],
        },
        {
            origin: 'Centro de Distribución Sur',
            destination: 'Ciudad Gamma',
            capacity: 90,
            availableItems: [
                { id: '6', name: 'Autopartes', weight: 35, profit: 320 },
                { id: '7', name: 'Herramientas', weight: 20, profit: 240 },
            ],
        },
        {
            origin: 'Centro de Distribución Este',
            destination: 'Ciudad Delta',
            capacity: 120,
            availableItems: [
                { id: '8', name: 'Medicamentos', weight: 10, profit: 400 },
                { id: '9', name: 'Equipos médicos', weight: 45, profit: 500 },
                { id: '10', name: 'Instrumental', weight: 15, profit: 220 },
            ],
        },
    ],
};
exports.integratedDatasetSmall = {
    transportProblem: {
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
    },
    routeCargoConfigs: [
        {
            origin: 'Origen A',
            destination: 'Destino X',
            capacity: 50,
            availableItems: [
                { id: '1', name: 'Item A', weight: 10, profit: 100 },
                { id: '2', name: 'Item B', weight: 20, profit: 150 },
            ],
        },
        {
            origin: 'Origen B',
            destination: 'Destino Y',
            capacity: 60,
            availableItems: [
                { id: '3', name: 'Item C', weight: 15, profit: 120 },
                { id: '4', name: 'Item D', weight: 25, profit: 180 },
            ],
        },
    ],
};
//# sourceMappingURL=integrated.dataset.js.map