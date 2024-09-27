import api from './index'; // Importa tu instancia de Axios

export const getProfiles = async () => {
  const response = await api.get('/profiles');
  return response.data; // Axios devuelve los datos en 'data'
};

export const getProfile = async (id: number) => {
  const response = await api.get(`/profiles/${id}`);
  return response.data;
};

export const addProfile = async (profile: { name: string, image: string }) => {
  const response = await api.post('/profiles', profile);
  return response.data;
};

export const updateProfile = async (id: number, updatedFields: Partial<{ name: string, image: string }>) => {
  const response = await api.put(`/profiles/${id}`, updatedFields);
  return response.data;
};

export const deleteProfile = async (id: number) => {
  const response = await api.delete(`/profiles/${id}`);
  return response.data;
};
