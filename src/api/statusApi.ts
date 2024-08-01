const BASE_URL = 'http://localhost:8000';

export const getStatuses = async () => {
  const response = await fetch(`${BASE_URL}/statuses`);
  return response.json();
};

export const getStatus = async (id: number) => {
  const response = await fetch(`${BASE_URL}/status/${id}`);
  return response.json();
};
