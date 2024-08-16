import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';

// Estilo personalizado para el botón de perfil
const ProfileButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'green',
  color: 'white',
  borderRadius: '20px',
  padding: '6px 16px',
  display: 'flex',
  alignItems: 'center',
  transition: 'width 0.3s ease',
  width: '48px', // Ancho inicial solo para el ícono
  justifyContent: 'center',
  '&:hover': {
    width: '150px', // Ancho cuando se pasa el mouse
    justifyContent: 'flex-start',
    backgroundColor: 'darkgreen',
  },
  '& .MuiButton-startIcon': {
    marginRight: '8px', // Espacio entre el ícono y el texto
  },
}));

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

export const ModalNewTask = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ProfileButton 
        startIcon={<PersonIcon />}
        variant="contained"
        size="large"
        onClick={handleClickOpen}
      >
        PROFILE
      </ProfileButton>
      <Button variant="contained" size="large" style={{ marginLeft: '10px' }}>+ New</Button>

      <StyledDialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="options-dialog-title"
        TransitionComponent={Slide}
        transitionDuration={500}
      >
        <PersonIcon style={{ fontSize: 60, marginBottom: '8px' }} />
        <DialogTitle id="options-dialog-title">Switch Workspaces</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center" marginBottom={2}>
            <WorkIcon style={{ marginRight: '8px' }} />
            <Typography variant="subtitle1">Workspace</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <WorkIcon style={{ marginRight: '8px' }} />
            <Typography variant="subtitle1">Workspace</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose}>
            Close
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default ModalNewTask;
