export declare const integratedDatasetExample: {
    transportProblem: {
        origins: {
            name: string;
            supply: number;
        }[];
        destinations: {
            name: string;
            demand: number;
        }[];
        costs: number[][];
    };
    routeCargoConfigs: {
        origin: string;
        destination: string;
        capacity: number;
        availableItems: {
            id: string;
            name: string;
            weight: number;
            profit: number;
        }[];
    }[];
};
export declare const integratedDatasetSmall: {
    transportProblem: {
        origins: {
            name: string;
            supply: number;
        }[];
        destinations: {
            name: string;
            demand: number;
        }[];
        costs: number[][];
    };
    routeCargoConfigs: {
        origin: string;
        destination: string;
        capacity: number;
        availableItems: {
            id: string;
            name: string;
            weight: number;
            profit: number;
        }[];
    }[];
};
