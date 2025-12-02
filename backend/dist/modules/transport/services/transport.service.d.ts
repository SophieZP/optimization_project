import { TransportProblemDto, TransportSolutionDto } from '../dto';
export declare class TransportService {
    solve(problem: TransportProblemDto): TransportSolutionDto;
    private vogelApproximationMethod;
    private calculateRowPenalties;
    private calculateColPenalties;
    private findMinCostInRow;
    private findMinCostInCol;
    private hasActiveSupplyOrDemand;
    private balanceProblem;
    private calculateResults;
    private validateProblem;
}
