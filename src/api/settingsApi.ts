import api from './index'; // Importa tu instancia de Axios



// Obtener una configuración específica por clave
export const getSettingByKey = async (key: string) => {
  const response = await api.get(`/settings/${key}`,{
    headers: {
        'Content-Type': 'application/json',
      },
  });
  return response.data;
};

// Agregar una nueva configuración
export const addSetting = async (setting: { key: string; value: string | null }) => {
  const response = await api.post('/settings', setting);
  return response.data;
};

