import { useState, useEffect } from 'react';
import { getPriorities, addPriority, updatePriority, deletePriority } from '../../api/prioritiesApi';

type Priority = {
  id: number;
  namepriority: string;
  created_at: string;
  updated_at: string;
};

const usePriorities = () => {
  const [data, setData] = useState<Priority[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const priorities = await getPriorities();
      setData(priorities);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createPriority = async (newPriority: Omit<Priority, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      await addPriority(newPriority);
      await fetchData(); // Refrescar la lista de prioridades
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyPriority = async (id: number, updatedPriority: Partial<Omit<Priority, 'id'>>) => {
    setLoading(true);
    try {
      await updatePriority(id, updatedPriority);
      await fetchData(); // Refrescar la lista de prioridades
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removePriority = async (id: number) => {
    setLoading(true);
    try {
      await deletePriority(id);
      await fetchData(); // Refrescar la lista de prioridades
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createPriority, modifyPriority, removePriority };
};

export default usePriorities;
