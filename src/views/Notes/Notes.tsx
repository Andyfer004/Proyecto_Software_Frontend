import React, { useState } from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import GlobalLayout from 'src/common/GlobalLayout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';
import NoteEditor from './NoteEditor'; // Importa el componente NoteEditor

const Notes = () => {
  const [openEditor, setOpenEditor] = useState(false);
  const [notes, setNotes] = useState([
    { title: 'NOTA #1', content: 'Lorem ipsum, dolor sit amet...', date: '24/05' },
    // Puedes añadir más notas aquí si es necesario
  ]);

  const handleOpenEditor = () => {
    setOpenEditor(true);
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const handleSaveNote = (title: string, content: string): void => {
    setNotes([...notes, { title, content, date: new Date().toLocaleDateString() }]);
  };
  

  return (
    <>
      <GlobalLayout>
        <Box className="row w-100 h-100 justify-content-center mt-5 mx-3">
          <Box className="col-md-10 my-3">
            <IconButton aria-label="add" onClick={handleOpenEditor}>
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton aria-label="list" onClick={() => console.log('List View')}>
              <ListIcon />
            </IconButton>
            <IconButton aria-label="grid" onClick={() => console.log('Grid View')}>
              <GridViewIcon />
            </IconButton>
          </Box>
          {notes.map((note, index) => (
            <Card key={index} variant="outlined" className="col-md-3 mx-2">
              <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                  {note.title}
                </Typography>
                <Typography variant="body2">
                  {note.content}
                  <br />
                  {`"${note.date}"`}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </GlobalLayout>
      <NoteEditor open={openEditor} onClose={handleCloseEditor} onSave={handleSaveNote} />
    </>
  );
};

export default Notes;
