import React from 'react';
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

const Login: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
              <TextField fullWidth label="Email address" id="form2Example1" variant="standard" />
              <TextField fullWidth label="Password" id="form2Example2" type="password" variant="standard" />
            </Box>


          <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
                id="form2Example31"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Link href="#!" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>




            <Button fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
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

          </form>
        ) : (
          <RegisterScreen />
        )}
      </Box>
    </GlobalLayout>
  );
};

export default Login;