import { useState, useEffect } from 'react';
import { getProfiles, addProfile, updateProfile, deleteProfile, assignProfile } from '../../api/profileApi'; // Asegúrate de tener esta función en tu API

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

  // Función para obtener todos los perfiles
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

  // Obtener perfiles al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para crear un nuevo perfil
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

  // Función para modificar un perfil existente
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

  // Función para eliminar un perfil
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

  // Nueva función para asignar un perfil a un usuario
  const assignProfileToUser = async (profileId: number, userId: number) => {
    setLoading(true);
    try {
      await assignProfile(profileId, userId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { 
    data, 
    loading, 
    error, 
    createProfile, 
    modifyProfile, 
    removeProfile, 
    assignProfileToUser // Exportar la función de asignación
  };
};

export default useProfiles;
