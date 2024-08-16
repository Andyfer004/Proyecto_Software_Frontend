import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    minWidth: 300,
    maxWidth: '20vw',
    height: '100vh',
    margin: 0,
    position: 'fixed',
    left: 0,
    top: 0,
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
  },
  '& .MuiDialogContent-root': {
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
    width: '100%',
  },
  '& .MuiDialogTitle-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%',
    textAlign: 'center',
  }
}));

// Estilo personalizado para el botón de "Close"
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'blue',
  color: 'white',
  borderRadius: '20px', // Hacer el botón medio redondo
  padding: '6px 16px', // Añadir algo de padding para mejorar la apariencia
  '&:hover': {
    backgroundColor: 'darkblue', // Cambiar el color al hacer hover
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
      <Button 
        variant="contained" 
        size="large" 
        style={{ backgroundColor: 'green', marginRight: '10px' }} 
        onClick={handleClickOpen}
      >
        PROFILE
      </Button>
      <Button variant="contained" size="large">+ New</Button>

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
          <Typography variant="subtitle1">Nombre</Typography>
          <Typography variant="body2" color="textSecondary">Profile</Typography>
          {/* Aquí puedes añadir más opciones que quieras mostrar en el modal */}
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
