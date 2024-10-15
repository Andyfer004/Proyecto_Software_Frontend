import { useState, useEffect } from 'react';
import { getReminders, addReminder, updateReminder, deleteReminder } from '../../api/remindersApi';

type Reminder = {
  id: number;
  description: string;
  alarm: boolean;
  datereminder: string;
  hourreminder: string;
  profileid: number;
  priorityid: number; // Agregar prioridad
  created_at: string;
  updated_at: string;
};

const useReminders = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const reminders = await getReminders();
      setData(reminders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createReminder = async (newReminder: Omit<Reminder, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      await addReminder(newReminder);
      await fetchData(); // Refrescar la lista de recordatorios
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
      await fetchData(); // Refrescar la lista de recordatorios
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
      await fetchData(); // Refrescar la lista de recordatorios
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createReminder, modifyReminder, removeReminder };
};

export default useReminders;
