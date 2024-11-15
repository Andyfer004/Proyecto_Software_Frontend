import { useState, useEffect } from 'react';
import { getReminders, addReminder, updateReminder, deleteReminder } from '../../api/remindersApi';

// Definición del tipo Reminder
type Reminder = {
  id: number;
  description: string;
  alarm: boolean;
  datereminder: string;
  hourreminder: string;
  profileid: number;
  priorityid: number;
  created_at: string;
  updated_at: string;
};

// Hook personalizado para manejar recordatorios
const useReminders = () => {
  // Estados locales
  const [data, setData] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener recordatorios asociados al perfil seleccionado
  const fetchData = async () => {
    const selectedProfileId = localStorage.getItem("selectedProfile");
    if (!selectedProfileId) {
      setError("No se encontró el perfil seleccionado.");
      setLoading(false);
      return;
    }

    try {
      const response = await getReminders({ profileid: parseInt(selectedProfileId, 10) });
      setData(response.reminders || []);
    } catch (err: any) {
      setError(err.message || "Error al obtener los recordatorios.");
    } finally {
      setLoading(false);
    }
  };

  // Llamada inicial para obtener datos
  useEffect(() => {
    fetchData();
  }, []);

  // Función para crear un nuevo recordatorio
  const createReminder = async (newReminder: Omit<Reminder, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      await addReminder(newReminder);
      await fetchData();
    } catch (err: any) {
      setError(err.message || "Error al crear el recordatorio.");
    } finally {
      setLoading(false);
    }
  };

  // Función para modificar un recordatorio existente
  const modifyReminder = async (id: number, updatedReminder: Partial<Omit<Reminder, 'id'>>) => {
    setLoading(true);
    try {
      await updateReminder(id, updatedReminder);
      await fetchData();
    } catch (err: any) {
      setError(err.message || "Error al actualizar el recordatorio.");
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un recordatorio
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

  // Retorno de los estados y funciones para ser utilizados en el componente
  return { data, loading, error, createReminder, modifyReminder, removeReminder };
};

export default useReminders;
