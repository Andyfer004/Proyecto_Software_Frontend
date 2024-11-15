import { useState } from 'react';
import axios from 'axios';

interface Setting {
  key: string;
  value: string | null;
}

export const useSettings = () => {
  const [setting, setSetting] = useState<Setting | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Get a specific setting by its key.
   * @param key - The key of the setting to retrieve.
   */
  const fetchSettingByKey = async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/settings/${key}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Reemplaza esto si tienes otra forma de autenticación
        },
      });
      setSetting(response.data);
    } catch (err) {
      setError('Error fetching the setting');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Save or update a setting.
   * @param key - The key of the setting to save or update.
   * @param value - The value of the setting to save or update.
   */
  const saveSetting = async (key: string, value: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        '/api/settings',
        { key, value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSetting(response.data.setting);
    } catch (err) {
      setError('Error saving the setting');
    } finally {
      setLoading(false);
    }
  };

  return {
    setting,
    loading,
    error,
    fetchSettingByKey,
    saveSetting,
  };
};
