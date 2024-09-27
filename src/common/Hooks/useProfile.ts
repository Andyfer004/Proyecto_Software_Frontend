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

  const createProfile = async (newProfile: Omit<Profile, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      await addProfile(newProfile);
      await fetchData(); // Refrescar la lista de perfiles
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyProfile = async (id: number, updatedProfile: Partial<Omit<Profile, 'id'>>) => {
    setLoading(true);
    try {
      await updateProfile(id, updatedProfile);
      await fetchData(); // Refrescar la lista de perfiles
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProfile = async (id: number) => {
    setLoading(true);
    try {
      await deleteProfile(id);
      await fetchData(); // Refrescar la lista de perfiles
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createProfile, modifyProfile, removeProfile };
};

export default useProfiles;
