import api from './index';

export const getReminders = async (profileId: number) => {
  const response = await api.get('/reminders', { params: { profileid: profileId } });
  return response.data;
};



export const getReminder = async (id: number) => {
  const response = await api.get(`/reminders/${id}`);
  return response.data;
};

export const addReminder = async (reminder: {
  description: string;
  alarm: boolean;
  datereminder: string;
  hourreminder: string;
  profileid: number;
  priorityid: number;
  status?: string;
}) => {
  const response = await api.post('/reminders', {
    ...reminder,
    status: reminder.status || 'incomplete', // Valor por defecto
  });
  return response.data;
};

export const updateReminder = async (
  id: number,
  updatedFields: {
    description?: string;
    alarm?: boolean;
    datereminder?: string;
    hourreminder?: string;
    profileid?: number;
    priorityid?: number;
    status?: string;
    completed:number;
  }
) => {
  const response = await api.put(`/reminders/${id}`, updatedFields);
  return response.data;
};

export const deleteReminder = async (id: number) => {
  const response = await api.delete(`/reminders/${id}`);
  return response.data;
};
