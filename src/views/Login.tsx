import React from 'react';
//import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import GlobalLayout from 'src/common/GlobalLayout';
import RegisterScreen from './Register';
import api from '../api';
import NotificationService from 'src/common/AlertNotification';
import ServiceToken from 'src/common/ServiceToken';
import { useNavigation } from '@react-navigation/native';


const client_id = '85916301134-bo9muens74h0idca344gj0i3jq1tf5ep.apps.googleusercontent.com';

const Login: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {



    try {
      const credentials = {
        email,
        password
      };
      const response = await api.post("/login", credentials);  
      
      
      if (response.data.user) {
        NotificationService.success(response.data.message)
        ServiceToken.saveToken(response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigation.navigate("home" as never)
        
      }
    } catch (error: any) {
      console.error('Error en el login:', error);
      NotificationService.handleErrors(error.response);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const handleLoginSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
  //   if ('profileObj' in response) {
  //     console.log('Login Success:', response.profileObj);
  //     // Manejo del acceso a los datos del usuario, response.profileObj contiene la información del perfil
  //   }
  // };

  const handleLoginFailure = (response: any) => {
    console.error('Login Failed:', response);
    // Manejo del error de inicio de sesión
  };

  return (
    <GlobalLayout>
      <Box sx={{ height:"100vh"}} className="row justify-content-center align-items-center">
          <Box sx={{ width: '95%',borderBottom: 1, borderColor: 'divider' }}>

          <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="nav tabs example"
                sx={{
                  '& .MuiTabs-flexContainer': {
                    justifyContent: 'center', // Centrar las pestañas
                    '@media (max-width: 600px)': {
                      flexDirection: 'column', // Cambiar a una disposición de columna en pantallas pequeñas
                    },
                  },
                  '& .MuiTab-root': {
                    minWidth: 'auto', // Permitir que las pestañas crezcan según el contenido
                    '@media (max-width: 600px)': {
                      marginBottom: '8px', // Agregar espacio entre las pestañas en pantallas pequeñas
                    },
                  },
                }}
              >
  <Tab label="Login" />
  <Tab label="Sign Up" />
</Tabs>

          </Box>
        {value === 0 ? (
          <form>
                  <Box
              sx={{
                '& > :not(style)': {
                  m: 1, // Espaciado entre los elementos
                },
                '@media (max-width: 600px)': {
                  flexDirection: 'column', // Cambiar a una disposición de columna en pantallas pequeñas
                },
              }}
            >
              <TextField fullWidth value={email}  onChange={(e) => setEmail(e.target.value)} label="Email address" id="form2Example1" variant="standard" />
              <TextField fullWidth value={password}  onChange={(e) => setPassword(e.target.value)} label="Password" id="form2Example2" type="password" variant="standard" />
            </Box>


          <Grid container  justifyContent="left" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            <Grid >
              <Link href="#!" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>




            <Button fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }} onClick={handleLogin}>
              Sign in
            </Button>
            
              <Box textAlign="center" sx={{ mt: 3 }}>
                <p>Not a member? <Link href="#!">Register</Link></p>
                <p>or sign up with:</p>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                  <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ mx: 1 }}>
                    Facebook
                  </Button>
                  <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ mx: 1 }}>
                    Google
                  </Button>
                </Box>
              </Box>

            <Box textAlign="center">
              <p>Not a member? <Link href="#!">Register</Link></p>
              <p>or sign up with:</p>
              <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ mx: 1 }} className='text-center' />
              {/* <GoogleLogin
                clientId={client_id}
                buttonText="Login with Google"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ mx: 1 }} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  </Button>
                )}
              /> */}
            </Box>
          </form>
        ) : (
          <RegisterScreen />
        )}
      </Box>
    </GlobalLayout>
  );
};

export default Login;