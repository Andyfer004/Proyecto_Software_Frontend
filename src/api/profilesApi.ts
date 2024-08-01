const BASE_URL = 'http://localhost:8000';

export const getProfiles = async () => {
  const response = await fetch(`${BASE_URL}/profiles`);
  return response.json();
};

export const getProfile = async (id: number) => {
  const response = await fetch(`${BASE_URL}/profiles/${id}`);
  return response.json();
};

export const addProfile = async (profile: { name: string; image: string }) => {
  const response = await fetch(`${BASE_URL}/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });
  return response.json();
};

export const updateProfile = async (id: number, updatedFields: Partial<{ name: string; image: string }>) => {
  const response = await fetch(`${BASE_URL}/profiles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });
  return response.json();
};

export const deleteProfile = async (id: number) => {
  const response = await fetch(`${BASE_URL}/profiles/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
