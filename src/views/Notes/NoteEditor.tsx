import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa los estilos del editor

// Define la interfaz incluyendo initialTitle e initialContent
interface NoteEditorProps {
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  initialTitle: string;
  initialContent: string;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ onClose, onSave, initialTitle, initialContent }) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [content, setContent] = useState<string>(initialContent);

  // Sincroniza los valores iniciales cuando cambian
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSave = () => {
    if (title && content) {
      onSave(title, content);
      onClose();
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
        <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
          Save Note
        </Button>
      </Box>
    </Box>
  );
};

export default NoteEditor;
