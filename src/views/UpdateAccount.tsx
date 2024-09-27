import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextField } from "@mui/material";

const UpdateAccountScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleUpdate = () => {
    const id = 'id'; 
  
    const userData = {
      name,
      email,
      password,
      phone,
      id
    };
  
    console.log(userData);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Account</Text>
      <View style={styles.form}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          style={styles.input}
          variant="outlined" // Agrega bordes al TextField
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
          fullWidth // Botón ocupa todo el ancho disponible
        >
          Update
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#f9f9f9', // Fondo más claro
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#333', // Color de texto más oscuro
  },
  form: {
    width: '100%', // Asegúrate de que el formulario ocupe el ancho completo
    maxWidth: 400, // Ancho máximo para mantener el diseño
  },
  input: {
    marginBottom: 15, // Aumenta el margen entre los campos
  },
  button: {
    marginTop: 20,
  },
  
});

export default UpdateAccountScreen;
