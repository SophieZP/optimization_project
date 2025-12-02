import { apiClient } from './client';
import { KnapsackProblemDto, KnapsackSolutionDto } from '../types/cargo.types';

export const cargoApi = {
  solve: async (problem: KnapsackProblemDto): Promise<KnapsackSolutionDto> => {
    const response = await apiClient.post<KnapsackSolutionDto>('/cargo/solve', problem);
    return response.data;
  },

  solveWithLimit: async (problem: KnapsackProblemDto, maxItems: number): Promise<KnapsackSolutionDto> => {
    const response = await apiClient.post<KnapsackSolutionDto>(
      `/cargo/solve-with-limit?maxItems=${maxItems}`,
      problem
    );
    return response.data;
  },

  optimizeMultiple: async (problems: KnapsackProblemDto[]): Promise<KnapsackSolutionDto[]> => {
    const response = await apiClient.post<KnapsackSolutionDto[]>('/cargo/optimize', problems);
    return response.data;
  },

  calculateEfficiency: async (problem: KnapsackProblemDto) => {
    const response = await apiClient.post('/cargo/efficiency', problem);
    return response.data;
  },
};