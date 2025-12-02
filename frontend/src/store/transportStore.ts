import { create } from 'zustand';
import { TransportSolutionDto } from '../types/transport.types';

interface TransportStore {
  solution: TransportSolutionDto | null;
  setSolution: (solution: TransportSolutionDto) => void;
  clearSolution: () => void;
}

export const useTransportStore = create<TransportStore>((set) => ({
  solution: null,
  setSolution: (solution) => set({ solution }),
  clearSolution: () => set({ solution: null }),
}));