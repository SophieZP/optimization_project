// Optimization types matching backend DTOs exactly
import { TransportProblemDto, TransportSolutionDto } from './transport.types';
import { CargoItemDto, KnapsackSolutionDto } from './cargo.types';

export interface RouteCargoDto {
  origin: string;
  destination: string;
  capacity: number;
  availableItems: CargoItemDto[];
}

export interface IntegratedProblemDto {
  transportProblem: TransportProblemDto;
  routeCargoConfigs: RouteCargoDto[];
}

export interface RouteOptimization {
  origin: string;
  destination: string;
  quantity: number;
  transportCost: number;
  cargoOptimization?: KnapsackSolutionDto;
  netProfit: number;
}

export interface IntegratedSolutionDto {
  transportSolution: TransportSolutionDto;
  routeOptimizations: RouteOptimization[];
  totalTransportCost: number;
  totalCargoProfit: number;
  totalNetProfit: number;
  activeRoutes: number;
  summary: string;
}