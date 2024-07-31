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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const notes = await getNotes();
        setData(notes);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });
};