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


  return { data, loading, error};
};

export default useStatus;
