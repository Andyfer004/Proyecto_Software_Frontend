const BASE_URL = 'http://localhost:8000';

export const getReminders = async () => {
  const response = await fetch(`${BASE_URL}/reminders`, {
    method: 'GET',
  });
  return response.json();
};

export const addReminder = async (reminder: { title: string; description: string; dueDate: string }) => {
    const response = await fetch(`${BASE_URL}/reminders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reminder),
    });
    return response.json();
  };

  export const updateReminder = async (id: number, updatedFields: Partial<{ title: string; description: string; dueDate: string }>) => {
    const response = await fetch(`${BASE_URL}/reminders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFields),
    });
    return response.json();
  };

  