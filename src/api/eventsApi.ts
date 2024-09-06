import api from './index'; // Importa tu instancia de Axios

// Obtener todos los eventos
export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

// Obtener un evento por su ID
export const getEvent = async (id: number) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

// Agregar un nuevo evento
export const addEvent = async (event: { 
  name: string; 
  link: string; 
  dateevent: string; 
  isrepetitive: boolean; 
  dayweek: string | null; // Dependerá de si el evento repetitivo tiene un día de la semana asociado 
  hourstart: string; 
  hourfinish: string; 
  userid: number; 
}) => {
  const response = await api.post('/events', event);
  return response.data;
};

// Actualizar un evento por su ID
export const updateEvent = async (id: number, updatedFields: Partial<{ 
  name: string; 
  link: string; 
  dateevent: string; 
  isrepetitive: boolean; 
  dayweek: string | null; 
  hourstart: string; 
  hourfinish: string; 
  userid: number; 
}>) => {
  const response = await api.put(`/events/${id}`, updatedFields);
  return response.data;
};

// Eliminar un evento por su ID
export const deleteEvent = async (id: number) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};
