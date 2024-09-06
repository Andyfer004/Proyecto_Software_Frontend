import { useState, useEffect } from 'react';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../../api/eventsApi';

type Event = {
  id: number;
  name: string;
  link: string;
  dateevent: string;
  isrepetitive: boolean;
  dayweek: string;
  hourstart: string;
  hourfinish: string;
  userid: number;
  created_at: string;
  updated_at: string;
};

const useEvents = () => {
  const [data, setData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const events = await getEvents();
      setData(events); // Guardar los eventos obtenidos
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createEvent = async (newEvent: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      await addEvent(newEvent);
      await fetchData(); // Refrescar la lista de eventos
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyEvent = async (id: number, updatedEvent: Partial<Omit<Event, 'id'>>) => {
    setLoading(true);
    try {
      await updateEvent(id, updatedEvent);
      await fetchData(); // Refrescar la lista de eventos
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeEvent = async (id: number) => {
    setLoading(true);
    try {
      await deleteEvent(id);
      await fetchData(); // Refrescar la lista de eventos
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createEvent, modifyEvent, removeEvent };
};

export default useEvents;
