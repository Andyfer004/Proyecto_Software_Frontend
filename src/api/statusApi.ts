import api from './index'; // Importa tu instancia de Axios

export const getStatuses = async () => {
  const response = await api.get('/statuses');
  return response.data;
};

export const getStatus = async (id: number) => {
  const response = await api.get(`/status/${id}`);
  return response.data;
};

export const addStatus = async (status: { name: string }) => {
  const response = await api.post('/status', status);
  return response.data;
};

export const updateStatus = async (id: number, updatedFields: Partial<{ name: string }>) => {
  const response = await api.put(`/status/${id}`, updatedFields);
  return response.data;
};

export const deleteStatus = async (id: number) => {
  const response = await api.delete(`/status/${id}`);
  return response.data;
};
