import { useState, useEffect } from 'react';
import { getReminders, addReminder, updateReminder, deleteReminder } from '../../api/remindersApi';

type Reminder = {
  id: number;
  description: string;
  alarm: boolean;
  datereminder: string;
  hourreminder: string;
  profileid: number;
  priorityid: number;
  completed: boolean;
  created_at: string;
  updated_at: string;
};

const useReminders = () => {
  const [data, setData] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener el profileid del localStorage
  const profileId = Number(localStorage.getItem('selectedProfile'));

  const fetchData = async () => {
    if (!profileId) {
      setError("Profile ID no especificado en el localStorage");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await getReminders(profileId); // Pasamos el profileId a la función getReminders
      setData(response.reminders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [profileId]);

  const createReminder = async (newReminder: Omit<Reminder, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      await addReminder({ ...newReminder, profileid: profileId }); // Agregamos profileId al crear el recordatorio
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyReminder = async (id: number, updatedReminder: Partial<Omit<Reminder, 'id'>>) => {
    setLoading(true);
    try {
      await updateReminder(id, updatedReminder);
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeReminder = async (id: number) => {
    setLoading(true);
    try {
      await deleteReminder(id);
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createReminder, modifyReminder, removeReminder };
};

export default useReminders;
