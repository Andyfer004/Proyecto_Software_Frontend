import api from './index'; // Importa tu instancia de Axios

export const getReminders = async () => {
  const response = await api.get('/reminders');
  return response.data; // Axios devuelve los datos en la propiedad 'data'
};

export const getReminder = async (id: number) => {
  const response = await api.get(`/reminders/${id}`);
  return response.data;
};

export const addReminder = async (reminder: { description: string, alarm: boolean, datereminder: string, hourreminder: string, profileid: number }) => {
  const response = await api.post('/reminders', reminder);
  return response.data;
};

export const updateReminder = async (id: number, updatedFields: Partial<{ description: string, alarm: boolean, datereminder: string, hourreminder: string, profileid: number }>) => {
  const response = await api.put(`/reminders/${id}`, updatedFields);
  return response.data;
};

export const deleteReminder = async (id: number) => {
  const response = await api.delete(`/reminders/${id}`);
  return response.data;
};
