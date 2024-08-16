import { useState, useEffect } from 'react';
import { getNotes, addNote, updateNote, deleteNote } from '../../api/notesApi';

type Note = {
  id: number;
  note: string;
  image: string;
  profileid: number;
  created_at: string;
  updated_at: string;
};

// Hook para obtener las notas
export const useFetchNotes = () => {
  const [data, setData] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const notes = await getNotes();
      setData(notes.notes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};

// Hook para crear una nueva nota
export const useCreateNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNote = async (newNote: Omit<Note, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      await addNote(newNote);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createNote, loading, error };
};

// Hook para modificar una nota
export const useModifyNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modifyNote = async (id: number, updatedNote: Partial<Omit<Note, 'id'>>) => {
    setLoading(true);
    try {
      await updateNote(id, updatedNote);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { modifyNote, loading, error };
};

// Hook para eliminar una nota
export const useRemoveNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeNote = async (id: number) => {
    setLoading(true);
    try {
      await deleteNote(id);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { removeNote, loading, error };
};
