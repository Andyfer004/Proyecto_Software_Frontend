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

  // Obtener el userId desde el objeto user en localStorage
  const userId = (() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      return user.id;
    }
    return null;
  })();

  const fetchData = async () => {
    if (!userId) {
      setError("User ID no especificado en el localStorage");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const priorities = await getPriorities(userId); // Pasamos userId a la función getPriorities
      setData(priorities);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

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
