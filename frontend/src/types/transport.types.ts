// Transport types matching backend DTOs exactly

export interface OriginDto {
  name: string;
  supply: number;
}

export interface DestinationDto {
  name: string;
  demand: number;
}

export interface TransportProblemDto {
  origins: OriginDto[];
  destinations: DestinationDto[];
  costs: number[][];
}

export interface AllocationDetail {
  origin: string;
  destination: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
}

export interface TransportSolutionDto {
  allocations: number[][];
  totalCost: number;
  allocationDetails: AllocationDetail[];
  method: string;
  isBalanced: boolean;
}