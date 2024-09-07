const BASE_URL = 'http://127.0.0.1:8000/public/api';

export const getStatuses = async () => {
  const response = await fetch(`${BASE_URL}/statuses`);
  return response.json();
};

export const getStatus = async (id: number) => {
  const response = await fetch(`${BASE_URL}/status/${id}`);
  return response.json();
};

export const addStatus = async (status: { name: string }) => {
  const response = await fetch(`${BASE_URL}/status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...status,
      profile_id: 1, // Agregamos el profile_id como 1
    }),
  });
  return response.json();
};


export const updateStatus = async (id: number, updatedFields: Partial<{ name: string }>) => {
  const response = await fetch(`${BASE_URL}/status/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });
  return response.json();
};

export const deleteStatus = async (id: number) => {
  const response = await fetch(`${BASE_URL}/status/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
