import { useState, useEffect } from 'react';
import { getProfiles, addProfile, updateProfile, deleteProfile } from '../../api/profileApi';

type Profile = {
  id: number;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
};

const useProfiles = () => {
  const [data, setData] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const profiles = await getProfiles();
      setData(profiles);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
