import api from './index'; // Importa tu instancia de Axios

export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data; // Axios devuelve los datos en 'data'
};

export const getTask = async (id: number) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const addTask = async (task: { title: string, description: string, due_date: string, status_id: number }) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id: number, updatedFields: Partial<{ title: string, description: string, due_date: string, status_id: number }>) => {
  const response = await api.put(`/tasks/${id}`, updatedFields);
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
