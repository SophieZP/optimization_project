import { useState } from 'react';
import { transportApi } from '../api/transport.api';
import { useTransportStore } from '../store/transportStore';
import { TransportProblemDto, TransportSolutionDto } from '../types/transport.types';
import toast from 'react-hot-toast';

export const useTransport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setSolution, clearSolution } = useTransportStore();

  const solve = async (problem: TransportProblemDto): Promise<TransportSolutionDto | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await transportApi.solve(problem);
      setSolution(result);
      toast.success('Problema de transporte resuelto exitosamente');
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al resolver el problema de transporte';
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
    reset,
    loading,
    error,
  };
};