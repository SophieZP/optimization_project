import { TransportService } from '../../transport/services/transport.service';
import { CargoService } from '../../cargo/services/cargo.service';
import { IntegratedProblemDto, IntegratedSolutionDto } from '../dto';
export declare class OptimizationService {
    private readonly transportService;
    private readonly cargoService;
    constructor(transportService: TransportService, cargoService: CargoService);
    solveIntegratedProblem(problem: IntegratedProblemDto): IntegratedSolutionDto;
    getOptimizationSummary(problem: IntegratedProblemDto): any;
    analyzeRouteEfficiency(problem: IntegratedProblemDto): any[];
    private generateSummary;
    private validateIntegratedProblem;
}
