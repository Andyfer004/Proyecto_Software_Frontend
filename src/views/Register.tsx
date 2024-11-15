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
    import NotificationService from "../common/AlertNotification";


    const RegisterScreen: React.FC = () => {
        const [name, setName] = useState('');
        const [lastname, setLastname] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [passwordConfirmation, setPasswordConfirmation] = useState('');
        const [phone, setPhone] = useState('');

        const handleRegister = async () => {
            try {
                let credentials = {
                    "name": name,
                    "lastname": lastname,
                    "email": email,
                    "password": password,
                    "password_confirmation": passwordConfirmation,
                    "phone": phone
                };
                const response = await api.post("/register", credentials);
                
                const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                
                if (data.user) {
                    NotificationService.success(data.message || "Registro exitoso");
                }
            } catch (error: any) {
                console.error('Error al registrar:', error);
                
                if (error.response) {
                    NotificationService.handleErrors(error.response);
                } else {
                    console.error("Error inesperado:", error);
                    NotificationService.handleErrors({ status: 500, message: "Error inesperado en el registro" });
                }
            }
        };
        
        

        

        return (
            <form  className='p-4' style={{borderRadius:'10%', background:'white', width: '40%', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                <Box className='w-100 text-center mt-5'>
                    <h3>UN RECORDATORIO, UNA TAREA, UNA META A LA VEZ</h3>
                </Box>
                <Box >
                    <Grid container spacing={2} justifyContent="center" sx={{marginLeft:'0px !important', width:'100% !important'}}>
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

                <Button fullWidth variant="contained" onClick={handleRegister}  sx={{ mt: 3, mb: { xs: 2, sm: 0, backgroundColor:'#c5bde8' } }}>
                Sign on
                </Button>


                <Box textAlign="center">    
                    <p>or sign on with:</p>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ mx: 1 , color:'#C5BDE8' , borderColor:'#C5BDE8' }}>
                        Facebook
                        </Button>
                        <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ mx: 1, color:'#C5BDE8' , borderColor:'#C5BDE8' }}>
                        Google
                        </Button>
                    </Box>
                </Box>

            </form>
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
