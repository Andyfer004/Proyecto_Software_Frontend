import api from './index'; // Ajusta la ruta si es necesario
import ServiceToken from '../common/ServiceToken'; // Asegúrate de tener la ruta correcta
import axios from './index'; // Asegúrate de que esta sea tu instancia de Axios

export const updateUser = async (id: number, updatedFields: Partial<{ name: string; lastname: string; email: string; phone: string; password: string }>) => {
    const token = ServiceToken.getToken(); // Obtén el token del localStorage
    console.log('Token que se envía en la solicitud:', token); // Verifica si el token es válido y no es nulo

    if (!token) {
        throw new Error("Token no encontrado. Por favor, inicia sesión nuevamente.");
    }

    const response = await axios.put(
        `/users/${id}`,
        updatedFields,
        {
            headers: {
                Authorization: `Bearer ${token}`, // Asegúrate de enviar el token en el header de autorización
                'Content-Type': 'application/json', // Asegúrate de especificar el tipo de contenido
            },
        }
    );
    return response.data;
};


export const deactivateUser = async (id: number) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  };