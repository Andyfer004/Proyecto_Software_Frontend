import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  IconButton,
  TextField,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreateNote } from '../../common/Hooks/useNotes';

interface NoteEditorProps {
  onClose: () => void;
  onSave: () => void; // Ahora no es opcional
  initialTitle: string;
  initialContent: string;
}

const extractTitleAndContent = (note: string) => {
  const titleMatch = note.match(/<strong>(.*?)<\/strong>/);
  const title = titleMatch ? titleMatch[1] : '';
  const content = note.replace(/<strong>.*?<\/strong><br\/?>/, '').trim();
  return { title, content };
};

const NoteEditor: React.FC<NoteEditorProps> = ({ onClose, onSave, initialTitle, initialContent }) => {
  const { title: extractedTitle, content: extractedContent } = extractTitleAndContent(initialTitle);
  const [title, setTitle] = useState<string>(extractedTitle);
  const [content, setContent] = useState<string>(extractedContent);
  const { createNote, loading, error } = useCreateNote();

  useEffect(() => {
    setTitle(extractedTitle);
    setContent(extractedContent);
  }, [initialTitle, initialContent]);

  const handleSave = async () => {
    if (title && content) {
      const combinedContent = `<strong>${title}</strong><br/>${content}`;

      await createNote({
        note: combinedContent,
        image: 'image.jpg',
        profileid: 1,
      });

      onSave(); // Refetch las notas
      onClose(); // Cierra el editor después de guardar
    } else {
      alert('Please fill out both fields.');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Edit Note
          </Typography>
          <IconButton color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 2, flexGrow: 1, overflow: 'auto' }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          style={{ height: '350px', marginBottom: '50px' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Button variant="outlined" startIcon={<ImageIcon />}>
            Add Image
          </Button>
        </Box>
        <Button variant="contained" color="primary" fullWidth onClick={handleSave} disabled={loading}>
          {loading ? 'Saving...' : 'Save Note'}
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Box>
  );
};

export default NoteEditor;
