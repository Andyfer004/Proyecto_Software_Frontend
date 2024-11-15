import api from './index'; // Asegúrate de importar tu instancia de Axios

// Función para obtener los reminders
export const getReminders = async ({ profileid }: { profileid: number }) => {
  const response = await api.get(`/reminders`, { params: { profileid } });
  return response.data;
};

// Función para agregar un nuevo reminder
export const addReminder = async (reminder: {
  description: string;
  alarm: boolean;
  datereminder: string;
  hourreminder: string;
  profileid: number;
  priorityid: number;
}) => {
  const response = await api.post('/reminders', reminder);
  return response.data;
};

// Funciones adicionales para actualizar y eliminar reminders
export const updateReminder = async (id: number, updatedFields: Partial<{ description: string, alarm: boolean, datereminder: string, hourreminder: string, profileid: number, priorityid: number, completed: boolean }>) => {
  const response = await api.put(`/reminders/${id}`, updatedFields);
  return response.data;
};

export const deleteReminder = async (id: number) => {
  const response = await api.delete(`/reminders/${id}`);
  return response.data;
};
