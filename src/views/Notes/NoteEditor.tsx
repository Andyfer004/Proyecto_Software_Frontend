import React, { useState } from 'react';
import {
  Button,
  Drawer,
  Box,
  IconButton,
  TextField,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import FormatSizeIcon from '@mui/icons-material/FormatSize';

// Define the interface for the component props
interface NoteEditorProps {
  open: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
}

const drawerWidth = 400;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  justifyContent: 'space-between',
}));

const NoteEditor: React.FC<NoteEditorProps> = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fontSize, setFontSize] = useState('medium');

  const handleSave = () => {
    if (title && content) {
      onSave(title, content);
      setTitle('');
      setContent('');
      onClose();
    } else {
      alert('Please fill out both fields.');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <DrawerHeader>
        <Typography variant="h6">Edit Note</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ padding: 2 }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          sx={{ fontSize: fontSize === 'large' ? 18 : fontSize === 'small' ? 12 : 14 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: 2 }}>
          <Button variant="outlined" startIcon={<ImageIcon />}>
            Add Image
          </Button>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Font Size</InputLabel>
            <Select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as string)}
              label="Font Size"
              startAdornment={<FormatSizeIcon />}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
        >
          Save Note
        </Button>
      </Box>
    </Drawer>
  );
};

export default NoteEditor;
