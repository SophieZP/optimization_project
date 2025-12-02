import { apiClient } from './client';
import { TransportProblemDto, TransportSolutionDto } from '../types/transport.types';

export const transportApi = {
  solve: async (problem: TransportProblemDto): Promise<TransportSolutionDto> => {
    const response = await apiClient.post<TransportSolutionDto>('/transport/solve', problem);
    return response.data;
  },

  validate: async (problem: TransportProblemDto) => {
    const response = await apiClient.post('/transport/validate', problem);
    return response.data;
  },
};