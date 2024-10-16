import { useState } from 'react';
import { updateUser, deactivateUser } from '../../api/userApi';

type User = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password?: string;
};

const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modifyUser = async (id: number, updatedUser: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>) => {
    setLoading(true);
    try {
        await updateUser(id, updatedUser); // Esta función usará el token desde localStorage
        
    } catch (err: any) {
        console.error('Error en la actualización:', err.response?.status, err.response?.data);
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

  

  const removeUser = async (id: number) => {
    setLoading(true);
    try {
      await deactivateUser(id);
      // Aquí podrías actualizar el estado de la UI si es necesario
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { modifyUser, removeUser, loading, error };
};

export default useUsers;