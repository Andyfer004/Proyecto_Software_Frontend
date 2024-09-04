const BASE_URL = 'http://localhost:8000';

export const getProfiles = async () => {
  const response = await fetch(`${BASE_URL}/profiles`);
  return response.json();
};

export const getProfile = async (id: number) => {
  const response = await fetch(`${BASE_URL}/profiles/${id}`);
  return response.json();
};
