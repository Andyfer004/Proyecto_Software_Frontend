import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GlobalLayout from '../../src/common/GlobalLayout';
import RegisterScreen from './Register';
import api from '../api';
import NotificationService from '../common/AlertNotification';
import ServiceToken from '../common/ServiceToken';
import { Platform } from 'react-native';  // Importar Platform para detectar la plataforma
import { useNavigation } from '@react-navigation/native';  // Para móvil
import { useNavigate } from 'react-router-dom';  // Para web
import { getProfiles } from '../api/profileApi';  // Asume que tienes una función API para obtener perfiles

const Login: React.FC = () => {
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingProfiles, setLoadingProfiles] = useState(false); // Estado para manejar la carga de perfiles

  // Usar useNavigation para móvil y useNavigate para web
  const navigation: any = Platform.OS === 'web' ? useNavigate() : useNavigation();

  const handleLogin = async () => {
    try {
      const credentials = { email, password };
      const response = await api.post("/login", credentials);

      if (response.data.user) {
        NotificationService.success(response.data.message);
        ServiceToken.saveToken(response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Después de guardar el token y user, llama a la API para obtener perfiles
        await handleFetchProfiles();

        // Navegación condicional según la plataforma
        if (Platform.OS === 'web') {
          navigation('/home'); // Redirección en web usando useNavigate
        } else if (typeof navigation.navigate === 'function') {
          navigation.navigate("home" as never); // Redirección en móvil usando useNavigation
        }
      }
    } catch (error: any) {
      console.error('Error en el login:', error);
      NotificationService.handleErrors(error.response);
    }
  };

  // Función para obtener perfiles después de iniciar sesión
  const handleFetchProfiles = async () => {
    setLoadingProfiles(true); // Mostrar algún indicador de carga si lo necesitas
    try {
      const profiles = await getProfiles(); // Asume que fetchProfiles es tu API para obtener perfiles

      if (profiles && profiles.length > 0) {
        const firstProfile = profiles[0];
        localStorage.setItem('selectedProfile', firstProfile.id.toString()); // Guardar el primer perfil en localStorage
        NotificationService.success(`Perfil ${firstProfile.name} seleccionado`);
      }
    } catch (error) {
      console.error('Error al obtener los perfiles:', error);
      NotificationService.error('Error al obtener los perfiles');
    } finally {
      setLoadingProfiles(false); // Termina el estado de carga
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <GlobalLayout>
      <Box sx={{ height: "100vh" }} className="row justify-content-center align-items-center">
        <Box sx={{ width: '95%', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="nav tabs example"
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
        </Box>
        {value === 0 ? (
          <form style={{ width: '63%' }}>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <TextField fullWidth value={email} onChange={(e) => setEmail(e.target.value)} label="Email address" variant="standard" />
              <TextField fullWidth value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="standard" />
            </Box>

            <Button fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>
              Sign in
            </Button>
          </form>
        ) : (
          <RegisterScreen />
        )}
      </Box>
    </GlobalLayout>
  );
};

export default Login;
