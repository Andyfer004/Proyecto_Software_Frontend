import api from './index'; // Importa tu instancia de Axios

export const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data; // Axios devuelve los datos en la propiedad 'data'
};

export const getNote = async (id: number) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const addNote = async (note: { note: string, image: string, profile_id: number }) => {
  const response = await api.post('/notes', note);
  return response.data;
};

export const updateNote = async (id: number, updatedFields: Partial<{ note: string, image: string, profile_id: number }>) => {
  const response = await api.put(`/notes/${id}`, updatedFields);
  return response.data;
};

export const deleteNote = async (id: number) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};
