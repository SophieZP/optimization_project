import { OriginDto } from './origin.dto';
import { DestinationDto } from './destination.dto';
export declare class TransportProblemDto {
    origins: OriginDto[];
    destinations: DestinationDto[];
    costs: number[][];
}
