import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";
import useUsers from "src/common/Hooks/useUser"; // Asegúrate de que la ruta sea correcta

const UpdateAccountScreen: React.FC = () => {
  const { modifyUser } = useUsers();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userToken = localStorage.getItem('userToken'); // Obtén el token directamente
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (!name) setName(user.name);
      if (!lastname) setLastname(user.lastname); // Asegúrate de obtener el lastname correctamente
      if (!email) setEmail(user.email);
      if (!phone) setPhone(user.phone);
      console.log('Token desde localStorage:', userToken); // Muestra el token en la consola
      console.log('Phone del usuario:', user.phone);
    }
  }, []);
  

  const handleUpdate = async () => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      alert('No se pudo recuperar la información del usuario.');
      return;
    }

    // Construir el objeto userData que se enviará en la solicitud
    const userData: any = {
      name,
      lastname, 
      email,
      phone,
    };

    // Solo incluye la contraseña si ha sido ingresada
    if (password) {
      userData.password = password;
    }

    try {
      await modifyUser(user.id, userData); // Envía los datos incluyendo la contraseña si está presente
      alert('Usuario actualizado correctamente');
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error al actualizar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h5" textAlign={"center"} style={styles.heading}>
            Update Account
          </Typography>
          <View style={styles.form}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              style={styles.input}
              variant="outlined"
            />
            <TextField
              label="Lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              fullWidth
              style={styles.input}
              variant="outlined"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              style={styles.input}
              variant="outlined"
            />
            
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
              style={styles.input}
              variant="outlined"
              placeholder="Deja en blanco si no quieres cambiar la contraseña"
            />
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              fullWidth
              style={styles.input}
              variant="outlined"
            />
            <Button 
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              style={styles.button}
              fullWidth
            >
              Update
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    padding: 20,
    borderRadius: 30,
  },
  heading: {
    marginBottom: 20,
    color: '#333',
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});

export default UpdateAccountScreen;