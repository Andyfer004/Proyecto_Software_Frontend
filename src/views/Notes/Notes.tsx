import React, { useState } from 'react';
import { Box, Grid, List, ListItem, ListItemText, Typography, IconButton, CircularProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteEditor from './NoteEditor';
import { useFetchNotes } from '../../common/Hooks/useNotes';

type Note = {
  id: number;
  note: string;
  image: string;
  profile_id: number;
  created_at: string;
  updated_at: string;
};

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { data: notes, loading, error, refetch } = useFetchNotes();

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleSaveNote = (noteContent: string): void => {
    const newNote = { 
      id: notes.length + 1, 
      note: noteContent, 
      image: '', 
      profile_id: 1, 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString() 
    };
    // Aquí deberías usar el hook de creación para agregar la nota a la base de datos
    refetch(); 
    setSelectedNote(newNote);
  };

  const handleDeleteNote = (index: number) => {
    const noteToDelete = notes[index];
    // Aquí deberías usar el hook de eliminación para borrar la nota de la base de datos
    refetch();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={4} className='mt-3' sx={{ borderRight: '1px solid #ccc', overflowY: 'auto' }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
            <IconButton aria-label="add" onClick={() => setSelectedNote({ id: 0, note: '', image: '', profile_id: 1, created_at: '', updated_at: '' })}>
              <AddCircleOutlineIcon />
            </IconButton>
            <List>
              {notes.map((note, index) => (
                <ListItem
                  key={note.id}
                  button
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleSelectNote(note)}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <ListItemText primary={note.note} secondary={note.created_at.split('T')[0]} />
                  {hoveredIndex === index && (
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleDeleteNote(index);
                      }}
                      edge="end"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={8}>
          {selectedNote && (
            <NoteEditor
              onClose={() => setSelectedNote(null)}
              onSave={(title, content) => handleSaveNote(content)} 
              initialTitle={selectedNote.note}
              initialContent={selectedNote.note}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Notes;
