import { create } from 'zustand';
import { KnapsackSolutionDto } from '../types/cargo.types';

interface CargoStore {
  solution: KnapsackSolutionDto | null;
  setSolution: (solution: KnapsackSolutionDto) => void;
  clearSolution: () => void;
}

export const useCargoStore = create<CargoStore>((set) => ({
  solution: null,
  setSolution: (solution) => set({ solution }),
  clearSolution: () => set({ solution: null }),
}));