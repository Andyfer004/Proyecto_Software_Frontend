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

const Login: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height:"100vh"}} className="row justify-content-center align-items-center">
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="nav tabs example"
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
      </Box>
      <form>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <TextField fullWidth label="Email address" id="form2Example1" variant="standard" />
          <TextField fullWidth label="Password" id="form2Example2" type="password" variant="standard" />
        </Box>

        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember me"
              id="form2Example31"
            />
          </Grid>
          <Grid item xs={6}>
            <Link href="#!" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>

        <Button fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Sign in
        </Button>

        <Box textAlign="center">
          <p>Not a member? <Link href="#!">Register</Link></p>
          <p>or sign up with:</p>
          <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ mx: 1 }} className='text-center' />
          <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ mx: 1 }} />
        </Box>
      </form>
    </Box>
  );
};

export default Login;