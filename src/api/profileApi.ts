import api from './index'; // Importa tu instancia de Axios

export const getProfiles = async () => {
  const response = await api.get('/profiles');
  return response.data;
};

export const getProfile = async (id: number) => {
  const response = await api.get(`/profiles/${id}`);
  return response.data;
};

export const addProfile = async (profile: any) => {

  // Realizar la solicitud POST usando FormData
  const response = await api.post('/profiles', profile, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateProfile = async (id: number, updatedFields: any) => {
  const formData = new FormData();
  
  // Append each field from updatedFields to FormData
  Object.keys(updatedFields).forEach((key) => {
    formData.append(key, updatedFields[key]);
  });

  // Perform the PUT request using FormData
  const response = await api.put(`/profiles/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const deleteProfile = async (id: number) => {
  const response = await api.delete(`/profiles/${id}`);
  return response.data;
};

export const assignProfile = async (profileId: number, userId: number) => {
  return await api.post(`/profiles/assign`, { profileId, userId });
};
