import api from './index'; // Importa tu instancia de Axios


// Obtener todas las prioridades por userId en la URL
export const getPriorities = async (userId: number) => {
  const response = await api.get(`/priorities/user/${userId}`);
  return response.data.priorities; // Suponiendo que la API devuelve las prioridades en la propiedad 'priorities'
};
// Obtener una prioridad por su ID
export const getPriority = async (id: number) => {
  const response = await api.get(`/priorities/${id}`);
  return response.data;
};

// Agregar una nueva prioridad
export const addPriority = async (priority: { namepriority: string }) => {
  const response = await api.post('/priorities', priority);
  return response.data;
};

// Actualizar una prioridad por su ID
export const updatePriority = async (id: number, updatedFields: Partial<{ namepriority: string }>) => {
  const response = await api.put(`/priorities/${id}`, updatedFields);
  return response.data;
};

// Eliminar una prioridad por su ID
export const deletePriority = async (id: number) => {
  const response = await api.delete(`/priorities/${id}`);
  return response.data;
};
