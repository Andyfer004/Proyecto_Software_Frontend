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
import { register } from "src/features/authActions";
import api from '../api';
import NotificationService from "src/common/AlertNotification";


const RegisterScreen: React.FC = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [phone, setPhone] = useState('');

    const handleRegister = async() => {
        try {
            let credentials = {
                "name": name,
                "lastname":lastname,
                "email":email,
                "password":password,
                "password_confirmation":passwordConfirmation,
                "phone":phone
            }
            const response = await api.post("/register",credentials);
            console.log('Respuesta del backend:', response);
            let data = JSON.parse(response.data);
            if(data.user){
                NotificationService.success(response.data.message)
            }
            // Manejar respuesta
          } catch (error) {
            console.error('Error al registrar:', error);
            NotificationService.error("Error al registrar");
            // Manejar error
        }
        console.log(name, lastname, email, password, passwordConfirmation, phone);
    };
    

    

    return (
        <Container sx={{ width: '63%' }} >
            <form>
                <Box sx={{ '& > :not(style)': { m: 1 }}}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} sx={{paddingLeft: { xs: '0 !important', sm: '0 8px !important' }}}>
                    <TextField value={name}  onChange={(e) => setName(e.target.value)}  fullWidth label="Name" id="nameuser" variant="standard" />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{paddingRight: { xs: '0 !important', sm: '0 8px !important' }}}>
                    <TextField value={lastname}  onChange={(e) => setLastname(e.target.value)} fullWidth  label="Lastname" id="lastname"  variant="standard" />
                    </Grid>
                </Grid>
                <TextField fullWidth value={email}  onChange={(e) => setEmail(e.target.value)} label="Email address" id="form2Example1" variant="standard" />
                <TextField fullWidth value={password}  onChange={(e) => setPassword(e.target.value)} label="Password" id="form2Example2" type="password" variant="standard" />
                <TextField fullWidth value={passwordConfirmation}  onChange={(e) => setPasswordConfirmation(e.target.value)} label="Password Confirmation" id="form2Example2" type="password" variant="standard" />
                <TextField fullWidth value={phone}  onChange={(e) => setPhone(e.target.value)} label="Phone" id="phone" type="number" variant="standard" />
                </Box>

                    <Button fullWidth variant="contained" onClick={handleRegister} color="primary" sx={{ mt: 3, mb: { xs: 2, sm: 0 } }}>
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
