export declare class AllocationDetail {
    origin: string;
    destination: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
}
export declare class TransportSolutionDto {
    allocations: number[][];
    totalCost: number;
    allocationDetails: AllocationDetail[];
    method: string;
    isBalanced: boolean;
}
