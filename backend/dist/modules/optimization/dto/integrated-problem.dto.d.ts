import { TransportProblemDto } from '../../transport/dto';
import { CargoItemDto } from '../../cargo/dto';
export declare class RouteCargoDto {
    origin: string;
    destination: string;
    capacity: number;
    availableItems: CargoItemDto[];
}
export declare class IntegratedProblemDto {
    transportProblem: TransportProblemDto;
    routeCargoConfigs: RouteCargoDto[];
}
