export declare class TransportProblem {
    id?: string;
    origins: {
        name: string;
        supply: number;
    }[];
    destinations: {
        name: string;
        demand: number;
    }[];
    costs: number[][];
    createdAt?: Date;
}
