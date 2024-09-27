const BASE_URL = 'http://localhost:8000';

export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`);
  return response.json();
};

export const getTask = async (id: number) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`);
  return response.json();
};

export const addTask = async (task: { title: string, description: string, due_date: string, status_id: number }) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (id: number, updatedFields: Partial<{ title: string, description: string, due_date: string, status_id: number }>) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });
  return response.json();
};

export const deleteTask = async (id: number) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
