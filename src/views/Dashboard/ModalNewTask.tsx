import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import useProfiles from '../../common/Hooks/useProfile'; // Importar el hook de perfiles

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
  width: 115, // Initial width of the button
  '&:hover': {
    width: 125, // Expanded width on hover
    backgroundColor: theme.palette.primary.dark,
    '& span': {
      opacity: 1, // Show text on hover
    },
  },
}));

export const ModalNewTask = () => {
  const [open, setOpen] = useState(false);
  const { data: profiles, loading } = useProfiles(); // Usar el hook para obtener los perfiles

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <span>Profile</span>
      </ProfileButton>

      <StyledDialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="options-dialog-title"
        TransitionComponent={Slide}
        transitionDuration={500}
      >
        <PersonIcon style={{ fontSize: 60, marginBottom: '8px' }} />
        <DialogTitle id="options-dialog-title">Seleccionar Perfil</DialogTitle>
        <DialogContent>
          {loading ? (
            <Typography>Cargando perfiles...</Typography>
          ) : (
            profiles.map((profile) => (
              <Box key={profile.id} display="flex" alignItems="center" marginBottom={2}>
                <ProfileIcon style={{ marginRight: '8px' }} />
                <Typography variant="subtitle1">{profile.name}</Typography>
              </Box>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose}>
            Cerrar
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default ModalNewTask;
