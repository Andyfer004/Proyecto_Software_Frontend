import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius,
    minWidth: 300,
    maxWidth: '20vw', // Limitar el ancho para que sea una barra lateral
    height: '100vh', // Asegurar que cubra toda la altura
    margin: 0, // Eliminar márgenes
    position: 'fixed',
    left: 0, // Anclar al lado izquierdo
    top: 0, // Anclar a la parte superior
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  '& .MuiDialogContent-root': {
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
  },
  '& .MuiDialogTitle-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacing(1),
  }
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
        <DialogTitle id="options-dialog-title">Switch Workspaces</DialogTitle>
        <DialogContent>
          {/* Aquí puedes añadir las opciones que quieras mostrar en el modal */}
          <p>Workspace 1</p>
          <p>Workspace 2</p>
          <p>Workspace 3</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default ModalNewTask;
