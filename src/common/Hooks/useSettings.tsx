import { useState, useEffect } from 'react';
import { getSettingByKey, addSetting } from '../../api/settingsApi'; // Ajusta la ruta según tu estructura

type Setting = {
  key: string;
  value: string | null;
};

const useSettings = () => {
  const [data, setData] = useState<Setting | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Función para obtener una configuración específica por su clave
   * @param key - Clave de la configuración a obtener
   */
  const fetchSettingByKey = async (key: string) => {
    setLoading(true);
    try {
      const setting = await getSettingByKey(key);
      setData(setting);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función para crear o actualizar una configuración
   * @param setting - Objeto con la clave y valor de la configuración
   */
  const createSetting = async (setting: Setting) => {
    setLoading(true);
    try {
      await addSetting(setting);
      await fetchSettingByKey(setting.key); // Refrescar la configuración recién agregada
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Retornar los datos y funciones necesarias para el hook
  return { 
    data, 
    loading, 
    error, 
    fetchSettingByKey, 
    createSetting 
  };
};

export default useSettings;
