const BASE_URL = 'http://localhost:8000';

export const getNotes = async () => {
  const response = await fetch(`${BASE_URL}/notes`);
  return response.json();
};

export const getNote = async (id: number) => {
  const response = await fetch(`${BASE_URL}/notes/${id}`);
  return response.json();
};

export const addNote = async (note: { note: string, image: string, profile_id: number }) => {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  return response.json();
};

export const updateNote = async (id: number, updatedFields: Partial<{ note: string, image: string, profile_id: number }>) => {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });
  return response.json();
};

export const deleteNote = async (id: number) => {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
