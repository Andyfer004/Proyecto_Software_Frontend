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
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNavigate } from 'react-router-dom';
import { getProfiles } from '../api/profileApi';
import { getSettingByKey } from '../api/settingsApi';
import { Divider } from '@mui/material';
import useSettings from 'src/common/Hooks/useSettings';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Login: React.FC = () => {
  const [value, setValue] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(false);

  const navigation: any = Platform.OS === 'web' ? useNavigate() : useNavigation();

  const handleLogin = async () => {
    try {
      const credentials = { email, password };
      const response = await api.post("/login", credentials);

      if (response.data.user) {
        NotificationService.success(response.data.message);
        ServiceToken.saveToken(response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        await handleFetchProfiles();


        if (Platform.OS === 'web') {
          navigation('/home');
        } else if (typeof navigation.navigate === 'function') {
          navigation.navigate("home" as never);
        }
      }
    } catch (error: any) {
      console.error('Error en el login:', error);
      NotificationService.handleErrors(error.response);
    }
  };

  const handleFetchProfiles = async () => {
    setLoadingProfiles(true);
    try {
      const profiles = await getProfiles();
  
      if (profiles && profiles.length > 0) {
        const firstProfile = profiles[0];
        localStorage.setItem('selectedProfile', firstProfile.id.toString());
        
      }

      await handleFetchSettings();

    } catch (error) {
      console.error('Error al obtener los perfiles:', error);
      NotificationService.error('Error al obtener los perfiles');
    } finally {
      setLoadingProfiles(false);
    }
  };
  


  const handleFetchSettings = async () => {
    setLoadingSettings(true);
    try {
      const settings =  await getSettingByKey('access_token_google');

      if(settings){
        console.log(settings.value);
        localStorage.setItem('access_token_google', settings.value);
      }
    } catch (error) {
      console.error('Error al obtener los settings:', error);
    } finally {
      setLoadingSettings(false);
    }
  };

  const handleLoginForm = () => {
    setValue(0);
  };

  const handleRegister = () => {
    setValue(1);
  };

  const [text] = useTypewriter({
    words: ['Organiza tu tiempo', 'Aprovecha cada minuto', 'Simplifica tu vida','Planifica con propósito','Transforma tu día'],
    loop: true,
    delaySpeed: 1500,
  });

  return (
      <Box sx={{ minHeight: "100vh", width:'100%'}} >
        <div className="custom-shape-divider-bottom-1730526750">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                  <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                  <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
              </svg>
        </div>
        <Box className='d-flex m-0'>
          <Box className='m-3 col-md-6'> 
            <img src={'assets/logo1.png'} alt="Logo" className='img-fluid' style={{height:'60px'}}/> 
          </Box>
          <Box className='col-md-6 d-flex justify-content-end align-items-center' sx={{paddingRight:'4rem'}}>
            {value === 0 ? (
              <Box>
                <span style={{fontSize:'13px'}} className='fw-bold'>¿No tienes cuenta?</span>
                <Button  variant="contained"  sx={{ mt: 2, mb: 2, ml:2, backgroundColor:'#c5bde8' }} onClick={handleRegister}>
                  Registrate
                </Button>
              </Box>
            ) : (
              <Box>
                <span style={{fontSize:'13px'}} className='fw-bold'>Ya tienes cuenta?</span>
                <Button  variant="contained"  sx={{ mt: 2, mb: 2, ml:2, backgroundColor:'#c5bde8' }} onClick={handleLoginForm}>
                  Inicia sesión
                </Button>
              </Box>
            )}
          </Box>
        </Box>
        <Divider/>
        <Box className='row justify-content-center align-items-center ' sx={{height:'80%', zIndex:999}}>
          {value === 0 ? (
            <form className='p-4' style={{borderRadius:'10%', background:'white', width: '40%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
              <Box className='w-100 text-center mt-5'>
                <h3><span>{text}</span><Cursor /></h3>
              </Box>
              <Box sx={{ '& > :not(style)': { m: 1 }, mt: 2 }}>
                <TextField fullWidth value={email} onChange={(e) => setEmail(e.target.value)} label="Email address" variant="standard" />
                <TextField fullWidth value={password} onChange={(e) => setPassword(e.target.value)} label="Password" type="password" variant="standard" />
              </Box>
              <Button fullWidth variant="contained" sx={{ mt: 2, mb: 2, backgroundColor:'#c5bde8' }} onClick={handleLogin}>
                LOGIN
              </Button>
            </form>
          ) : (
            <RegisterScreen />
          )}
        </Box>
      </Box>
  );
};

export default Login;
