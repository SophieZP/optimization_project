import { OptimizationService } from '../services/optimization.service';
import { IntegratedProblemDto, IntegratedSolutionDto } from '../dto';
export declare class OptimizationController {
    private readonly optimizationService;
    constructor(optimizationService: OptimizationService);
    solveComplete(problem: IntegratedProblemDto): IntegratedSolutionDto;
    getSummary(problem: IntegratedProblemDto): any;
    analyzeEfficiency(problem: IntegratedProblemDto): any[];
}
