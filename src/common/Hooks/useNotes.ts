// src/common/hooks/useNotes.ts
import { useState, useEffect } from 'react';
import { getNotes, addNote, updateNote, deleteNote } from '../../api/notesApi';

type Note = {
  id: number;
  note: string;
  image: string;
  profile_id: number;
  created_at: string;
  updated_at: string;
};

const useNotes = () => {
  const [data, setData] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const notes = await getNotes();
      setData(notes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createNote = async (newNote: Omit<Note, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      await addNote(newNote);
      await fetchData(); // Refrescar la lista de notas
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const modifyNote = async (id: number, updatedNote: Partial<Omit<Note, 'id'>>) => {
    setLoading(true);
    try {
      await updateNote(id, updatedNote);
      await fetchData(); // Refrescar la lista de notas
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeNote = async (id: number) => {
    setLoading(true);
    try {
      await deleteNote(id);
      await fetchData(); // Refrescar la lista de notas
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, createNote, modifyNote, removeNote };
};

export default useNotes;
