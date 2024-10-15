import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import useTasks from 'src/common/Hooks/useTasks';
import useProfiles from '../../common/Hooks/useProfile'; 
import { addProfile } from 'src/api/profileApi'; // Importa la función para agregar perfil

// Estilos personalizados
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
  const [showNewProfileForm, setShowNewProfileForm] = useState(false); // Para alternar el formulario de nuevo perfil
  const [newProfileName, setNewProfileName] = useState(''); // Almacena el nombre del nuevo perfil
  const [newProfileImage, setNewProfileImage] = useState(''); // Almacena la imagen del nuevo perfil como texto
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null); // Almacena el perfil seleccionado
  const { createTask, modifyTask, loading: loadingTask, error } = useTasks();
  const { data: profiles, loading } = useProfiles(); // Usa el hook para obtener perfiles

  // Cargar el perfil guardado de localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('selectedProfile');
    if (savedProfile) {
      setSelectedProfile(Number(savedProfile));
    }
  }, []);

  // Manejar apertura del modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Manejar cierre del modal
  const handleClose = () => {
    setOpen(false);
    setShowNewProfileForm(false); // Reiniciar el formulario al cerrar el modal
  };

  // Seleccionar un perfil
  const handleSelectProfile = (profileId: number) => {
    setSelectedProfile(profileId);
    localStorage.setItem('selectedProfile', profileId.toString()); // Guardar el perfil seleccionado en localStorage
    handleClose();
  };

  // Manejar el envío de un nuevo perfil
  const handleNewProfileSubmit = async () => {
    if (newProfileName) {
      try {
        // Llamar a la API para guardar el nuevo perfil
        await addProfile({ name: newProfileName, image: newProfileImage }); // Pasa el nombre y la imagen como texto
        console.log(`Nuevo perfil creado: ${newProfileName}`);
        setNewProfileName('');
        setNewProfileImage('');
        setShowNewProfileForm(false);
        window.location.reload(); // Refrescar la lista de perfiles tras agregar uno nuevo
      } catch (error) {
        console.error('Error al crear el perfil:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <ProfileButton 
        variant="contained"
        size="large"
        onClick={handleClickOpen}
        style={{ backgroundColor: 'green' }}
      >
        <ProfileIcon style={{ marginRight: '8px' }} />
        <span>Perfil</span>
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
              <Box 
                key={profile.id} 
                display="flex" 
                alignItems="center" 
                marginBottom={2} 
                onClick={() => handleSelectProfile(profile.id)} 
                style={{ cursor: 'pointer', backgroundColor: profile.id === selectedProfile ? 'lightgreen' : 'transparent', padding: '8px', borderRadius: '8px' }}
              >
                <ProfileIcon style={{ marginRight: '8px' }} />
                <Typography variant="subtitle1">{profile.name}</Typography>
              </Box>
            ))
          )}
          {/* Formulario para nuevo perfil */}
          {showNewProfileForm ? (
            <>
              <TextField
                label="Nombre del nuevo perfil"
                variant="outlined"
                fullWidth
                value={newProfileName}
                onChange={(e) => setNewProfileName(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <TextField
                label="URL de la imagen"
                variant="outlined"
                fullWidth
                value={newProfileImage}
                onChange={(e) => setNewProfileImage(e.target.value)}
                style={{ marginBottom: '16px' }}
              />
              <Box display="flex" justifyContent="space-between" width="100%">
                <Button variant="contained" color="secondary" onClick={() => setShowNewProfileForm(false)}>
                  Regresar
                </Button>
                <Button variant="contained" color="primary" onClick={handleNewProfileSubmit}>
                  Confirmar
                </Button>
              </Box>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setShowNewProfileForm(true)}>
              +
            </Button>
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
