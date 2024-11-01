import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GlobalLayout from '../../src/common/GlobalLayout';
import RegisterScreen from './Register';
import NotificationService from '../common/AlertNotification';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation: any = Platform.OS === 'web' ? useNavigate() : useNavigation();

  const handleLogin = () => {
    const hardcodedEmail = "usuario@ejemplo.com";
    const hardcodedPassword = "contraseña123";

    if (email === hardcodedEmail && password === hardcodedPassword) {
      NotificationService.success("Inicio de sesión exitoso");
      localStorage.setItem("user", JSON.stringify({ email }));

      if (Platform.OS === 'web') {
        navigation('/home');
      } else if (typeof navigation.navigate === 'function') {
        navigation.navigate("home" as never);
      }
    } else {
      NotificationService.error("Correo electrónico o contraseña incorrectos");
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <GlobalLayout hideFooter> {/* Pasamos hideFooter para ocultar el footer */}
      <Box sx={{ height: "100vh" }} className="row justify-content-center align-items-center">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img src={'assets/logo1.png'} alt="Logo" style={{ width: '450px', height: 'auto' }} />
        </Box>
        <Box sx={{ width: '95%', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="nav tabs example"
          >
            <Tab label="Iniciar Sesión" />
            <Tab label="Registrarse" />
          </Tabs>
        </Box>
        {value === 0 ? (
          <form style={{ width: '63%' }}>
            <Box sx={{ '& > :not(style)': { m: 1 }, mt: 2 }}>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Correo Electrónico"
                variant="standard"
              />
              <TextField
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Contraseña"
                type="password"
                variant="standard"
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleLogin}
            >
              Iniciar Sesión
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
