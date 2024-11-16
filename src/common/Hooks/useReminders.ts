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
  completed:string;
  status: string;
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
    const selectedProfileId = localStorage.getItem("selectedProfile");
    if (!selectedProfileId) return;
      const response = await getReminders( parseInt(selectedProfileId, 10) );
      setData(response.reminders || []);
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
      setError(err.message || "Error al obtener los recordatorios.");
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
      setError(err.message || "Error al crear el recordatorio.");
    } finally {
      setLoading(false);
    }
  };

const toggleReminderStatus = async (id: number, currentStatus: string) => {
  setLoading(true);
  try {
    const newStatus = currentStatus === 'complete' ? 'incomplete' : 'complete';

    const response = await updateReminder(id, { completed: 0 });
    console.log('Server Response:', response); // Log para ver la respuesta del servidor

    await fetchData();
  } catch (err: any) {
    console.error("Error updating reminder status:", err.message);
    setError(err.message || "Error al actualizar el estado del recordatorio.");
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
      setError(err.message || "Error al eliminar el recordatorio.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createReminder, toggleReminderStatus, removeReminder };
};
{}

export default useReminders;
