import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import useTasks from 'src/common/Hooks/useTasks';//  import your useTasks hook

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    minWidth: 300,
    maxWidth: '20vw',
    height: '100vh',
    margin: 0,
    position: 'fixed',
    left: '1vh',
    top: 0,
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
  },
  '& .MuiDialogContent-root': {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    width: '100%',
  },
  '& .MuiDialogTitle-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'darkred',
  color: 'white',
  borderRadius: '20px',
  padding: '6px 16px',
  '&:hover': {
    backgroundColor: 'red',
  },
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: '20px',
  padding: '6px 16px',
  display: 'flex',
  alignItems: 'center',
  transition: 'width 0.3s ease',
  overflow: 'hidden',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  width: 115,
  '&:hover': {
    width: 125,
    backgroundColor: theme.palette.primary.dark,
    '& span': {
      opacity: 1,
    },
  },
}));

export const ModalNewTask = () => {
  const [open, setOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    due_date: '',
    status_id: 1, // Default status
  });
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState<number | null>(null);

  const { createTask, modifyTask, loading, error } = useTasks();

  const handleClickOpen = () => {
    setOpen(true);
    setIsEditing(false);
    setTaskData({
      title: '',
      description: '',
      due_date: '',
      status_id: 1,
    });
    setTaskId(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSaveTask = async () => {
    if (isEditing && taskId !== null) {
      await modifyTask(taskId, taskData);
    } else {
      await createTask(taskData);
    }
    handleClose(); // Close the dialog after saving
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <ProfileButton 
        variant="contained"
        size="large"
        onClick={handleClickOpen}
        style={{ backgroundColor: 'green' }}
      >
        <ProfileIcon style={{ marginRight: '8px'}} />
        <span >PROFILE</span>
      </ProfileButton>

      <StyledDialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="options-dialog-title"
        TransitionComponent={Slide}
        transitionDuration={500}
      >
        <PersonIcon style={{ fontSize: 60, marginBottom: '8px' }} />
        <DialogTitle id="options-dialog-title">{isEditing ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Due Date"
            name="due_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={taskData.due_date}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Status ID"
            name="status_id"
            type="number"
            value={taskData.status_id}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          {error && <Typography color="error">{error}</Typography>}
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose}>
            Cancel
          </StyledButton>
          <StyledButton onClick={handleSaveTask} disabled={loading}>
            {isEditing ? 'Update Task' : 'Add Task'}
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default ModalNewTask;
