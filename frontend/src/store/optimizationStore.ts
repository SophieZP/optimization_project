import { create } from 'zustand';
import { IntegratedSolutionDto } from '../types/optimization.types';

interface OptimizationStore {
  solution: IntegratedSolutionDto | null;
  setSolution: (solution: IntegratedSolutionDto) => void;
  clearSolution: () => void;
}

export const useOptimizationStore = create<OptimizationStore>((set) => ({
  solution: null,
  setSolution: (solution) => set({ solution }),
  clearSolution: () => set({ solution: null }),
}));