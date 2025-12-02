export declare class SelectedItemDetail {
    id: string;
    name: string;
    weight: number;
    profit: number;
}
export declare class KnapsackSolutionDto {
    selectedItemIds: string[];
    selectedItems: SelectedItemDetail[];
    totalProfit: number;
    totalWeight: number;
    utilizationPercentage: number;
    remainingCapacity: number;
    method: string;
}
