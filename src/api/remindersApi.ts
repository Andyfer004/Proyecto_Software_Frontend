const BASE_URL = 'http://localhost:8000';

export const getReminders = async () => {
  const response = await fetch(`${BASE_URL}/reminders`, {
    method: 'GET',
  });
  return response.json();
};

