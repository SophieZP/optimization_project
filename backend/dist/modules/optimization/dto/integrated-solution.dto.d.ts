import { TransportSolutionDto } from '../../transport/dto';
import { KnapsackSolutionDto } from '../../cargo/dto';
export declare class RouteOptimization {
    origin: string;
    destination: string;
    quantity: number;
    transportCost: number;
    cargoOptimization?: KnapsackSolutionDto;
    netProfit: number;
}
export declare class IntegratedSolutionDto {
    transportSolution: TransportSolutionDto;
    routeOptimizations: RouteOptimization[];
    totalTransportCost: number;
    totalCargoProfit: number;
    totalNetProfit: number;
    activeRoutes: number;
    summary: string;
}
