// Cargo types matching backend DTOs exactly

export interface CargoItemDto {
  id: string;
  name: string;
  weight: number;
  profit: number;
  description?: string;
}

export interface KnapsackProblemDto {
  capacity: number;
  items: CargoItemDto[];
}

export interface SelectedItemDetail {
  id: string;
  name: string;
  weight: number;
  profit: number;
}

export interface KnapsackSolutionDto {
  selectedItemIds: string[];
  selectedItems: SelectedItemDetail[];
  totalProfit: number;
  totalWeight: number;
  remainingCapacity: number;
  utilizationPercentage: number;
  method: string;
}