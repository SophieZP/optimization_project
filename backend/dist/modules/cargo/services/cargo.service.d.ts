import { KnapsackProblemDto, KnapsackSolutionDto } from '../dto';
export declare class CargoService {
    solve(problem: KnapsackProblemDto): KnapsackSolutionDto;
    optimizeMultipleScenarios(problems: KnapsackProblemDto[]): KnapsackSolutionDto[];
    solveWithItemLimit(problem: KnapsackProblemDto, maxItems: number): KnapsackSolutionDto;
    calculateEfficiency(problem: KnapsackProblemDto): any[];
    private validateProblem;
}
