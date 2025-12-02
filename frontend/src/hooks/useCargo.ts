import { useState } from 'react';
import { cargoApi } from '../api/cargo.api';
import { useCargoStore } from '../store/cargoStore';
import { KnapsackProblemDto, KnapsackSolutionDto } from '../types/cargo.types';
import toast from 'react-hot-toast';

export const useCargo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setSolution, clearSolution } = useCargoStore();

  const solve = async (problem: KnapsackProblemDto): Promise<KnapsackSolutionDto | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await cargoApi.solve(problem);
      setSolution(result);
      toast.success('Problema de carga resuelto exitosamente');
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al resolver el problema de carga';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const solveWithLimit = async (problem: KnapsackProblemDto, maxItems: number): Promise<KnapsackSolutionDto | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await cargoApi.solveWithLimit(problem, maxItems);
      setSolution(result);
      toast.success('Problema de carga con límite resuelto exitosamente');
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al resolver el problema de carga con límite';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    clearSolution();
    setError(null);
  };

  return {
    solve,
    solveWithLimit,
    reset,
    loading,
    error,
  };
};