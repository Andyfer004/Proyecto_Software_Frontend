import { useState, useEffect } from 'react';
import { getStatuses, addStatus, updateStatus, deleteStatus } from '../../api/statusApi';

type Status = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

const useStatus = () => {
  const [data, setData] = useState<Status[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const statuses = await getStatuses();
      setData(statuses);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createStatus = async (newStatus: Omit<Status, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      await addStatus(newStatus);
      await fetchData(); // Refrescar la lista de status
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyStatus = async (id: number, updatedStatus: Partial<Omit<Status, 'id'>>) => {
    setLoading(true);
    try {
      await updateStatus(id, updatedStatus);
      await fetchData(); // Refrescar la lista de status
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeStatus = async (id: number) => {
    setLoading(true);
    try {
      await deleteStatus(id);
      await fetchData(); // Refrescar la lista de status
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createStatus, modifyStatus, removeStatus };
};

export default useStatus;
