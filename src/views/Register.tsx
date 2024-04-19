import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
import GlobalLayout from "src/common/GlobalLayout";


const RegisterScreen: React.FC = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = () => {
        console.log(name, lastname, email, password, passwordConfirmation, phone);
    };
    

    return (
        <Container sx={{ width: '63%' }} >
            <form>
                <Box sx={{ '& > :not(style)': { m: 1 }}}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} sx={{paddingLeft: { xs: '0 !important', sm: '0 8px !important' }}}>
                    <TextField fullWidth label="Name" id="nameuser" variant="standard" />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{paddingRight: { xs: '0 !important', sm: '0 8px !important' }}}>
                    <TextField fullWidth label="Lastname" id="lastname"  variant="standard" />
                    </Grid>
                </Grid>
                <TextField fullWidth label="Email address" id="form2Example1" variant="standard" />
                <TextField fullWidth label="Password" id="form2Example2" type="password" variant="standard" />
                <TextField fullWidth label="Password Confirmation" id="form2Example2" type="password" variant="standard" />
                <TextField fullWidth label="Phone" id="phone" type="number" variant="standard" />
                </Box>

                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: { xs: 2, sm: 0 } }}>
                    Sign on
                    </Button>


                    <Box textAlign="center">    
                        <p>or sign on with:</p>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ mx: 1 }}>
                            Facebook
                            </Button>
                            <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ mx: 1 }}>
                            Google
                            </Button>
                        </Box>
                        </Box>

            </form>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default RegisterScreen;
