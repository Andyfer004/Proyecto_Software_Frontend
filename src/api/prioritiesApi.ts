const BASE_URL = 'http://localhost:8000';

export const getPriorities = async () => {
  const response = await fetch(`${BASE_URL}/priorities`);
  return response.json();
};

export const getPriority = async (id: number) => {
  const response = await fetch(`${BASE_URL}/priorities/${id}`);
  return response.json();
};

export const addPriority = async (priority: { namepriority: string }) => {
  const response = await fetch(`${BASE_URL}/priorities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...priority,
      profile_id: 1,
    }),
  });
  return response.json();
};

export const updatePriority = async (id: number, updatedFields: Partial<{ namepriority: string }>) => {
  const response = await fetch(`${BASE_URL}/priorities/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });
  return response.json();
};

export const deletePriority = async (id: number) => {
  const response = await fetch(`${BASE_URL}/priorities/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
