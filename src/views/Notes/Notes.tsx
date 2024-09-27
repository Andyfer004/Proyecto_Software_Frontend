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
  profileid: number;
  created_at: string;
  updated_at: string;
};

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Utiliza el hook para obtener las notas, asegúrate de que `data` sea un array vacío inicialmente
  const { data: notes = [], loading, error, refetch } = useFetchNotes();
  console.log("Fetched notes:", notes);

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleSaveNote = (noteContent: string): void => {
    const newNote = { 
      id: notes.length + 1, 
      note: noteContent, 
      image: '', 
      profileid: 1, 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString() 
    };
    refetch(); 
    setSelectedNote(newNote);
  };

  const handleDeleteNote = (index: number) => {
    const noteToDelete = notes[index];
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
            <IconButton aria-label="add" onClick={() => setSelectedNote({ id: 0, note: '', image: '', profileid: 1, created_at: '', updated_at: '' })}>
              <AddCircleOutlineIcon />
            </IconButton>
            <List>
              {Array.isArray(notes) && notes.map((note, index) => (
                <ListItem
                  key={note.id}
                  button
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleSelectNote(note)}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <ListItemText primary={
                      <div dangerouslySetInnerHTML={{ __html: note.note }} />
                    }
                    secondary={note.created_at.split('T')[0]} />
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
              onSave={refetch} 
              onClose={() => setSelectedNote(null)}
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
