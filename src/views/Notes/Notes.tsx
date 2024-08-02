import React, { useState } from 'react';
import { Box, Grid, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteEditor from './NoteEditor'; // Importa el componente NoteEditor

interface Note {
  title: string;
  content: string;
  date: string;
}

const Notes = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([
    { title: 'NOTA #1', content: 'Lorem ipsum, dolor sit amet...', date: '24/05' },
    { title: 'NOTA #2', content: 'Otra nota de ejemplo...', date: '25/05' },
  ]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleSaveNote = (title: string, content: string): void => {
    const newNote = { title, content, date: new Date().toLocaleDateString() };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
  };

  const handleDeleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ height: '100vh', width:'100%', overflow: 'hidden' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={4} className='mt-3' sx={{ borderRight: '1px solid #ccc', overflowY: 'auto' }}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Notes
            </Typography>
            <IconButton aria-label="add" onClick={() => setSelectedNote({ title: '', content: '', date: '' })}>
              <AddCircleOutlineIcon />
            </IconButton>
            <List>
              {notes.map((note, index) => (
                <ListItem
                  key={index}
                  button
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleSelectNote(note)}
                  sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <ListItemText primary={note.title} secondary={note.date} />
                  {hoveredIndex === index && (
                    <IconButton
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation(); // Evita seleccionar la nota al hacer clic en eliminar
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
              onSave={handleSaveNote}
              initialTitle={selectedNote.title}
              initialContent={selectedNote.content}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Notes;
