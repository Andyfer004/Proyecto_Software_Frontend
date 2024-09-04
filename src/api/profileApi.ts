const BASE_URL = 'http://localhost:8000';

export const getProfiles = async () => {
  const response = await fetch(`${BASE_URL}/profiles`);
  return response.json();
};
