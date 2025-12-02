import { TransportService } from '../services/transport.service';
import { TransportProblemDto, TransportSolutionDto } from '../dto';
export declare class TransportController {
    private readonly transportService;
    constructor(transportService: TransportService);
    solve(problem: TransportProblemDto): TransportSolutionDto;
    validate(problem: TransportProblemDto): {
        valid: boolean;
        message: string;
        isBalanced: boolean;
        totalSupply: number;
        totalDemand: number;
    } | {
        valid: boolean;
        message: any;
        isBalanced?: undefined;
        totalSupply?: undefined;
        totalDemand?: undefined;
    };
}
