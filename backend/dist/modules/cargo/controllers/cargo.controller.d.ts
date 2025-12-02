import { CargoService } from '../services/cargo.service';
import { KnapsackProblemDto, KnapsackSolutionDto } from '../dto';
export declare class CargoController {
    private readonly cargoService;
    constructor(cargoService: CargoService);
    solve(problem: KnapsackProblemDto): KnapsackSolutionDto;
    solveWithLimit(problem: KnapsackProblemDto, maxItems: number): KnapsackSolutionDto;
    optimizeMultiple(problems: KnapsackProblemDto[]): KnapsackSolutionDto[];
    calculateEfficiency(problem: KnapsackProblemDto): any[];
}
