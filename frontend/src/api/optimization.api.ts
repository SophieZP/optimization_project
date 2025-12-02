import { apiClient } from './client';
import { IntegratedProblemDto, IntegratedSolutionDto } from '../types/optimization.types';

export const optimizationApi = {
  solveComplete: async (problem: IntegratedProblemDto): Promise<IntegratedSolutionDto> => {
    const response = await apiClient.post<IntegratedSolutionDto>('/optimization/solve-complete', problem);
    return response.data;
  },

  getSummary: async (problem: IntegratedProblemDto) => {
    const response = await apiClient.post('/optimization/summary', problem);
    return response.data;
  },

  analyzeEfficiency: async (problem: IntegratedProblemDto) => {
    const response = await apiClient.post('/optimization/analyze-efficiency', problem);
    return response.data;
  },
};