import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextField } from "@mui/material";

const UpdateAccountScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleUpdate = () => {
    // ID del usuario que se desea actualizar
    const id = 'id'; // Este valor debe ser obtenido o almacenado en algún lugar
  
    // Usando template literals para insertar el ID del usuario en la URL
    const apiUrl = `http://localhost:8000/api/users/${id}`;
  
    // Objeto con los datos del formulario
    const userData = {
      name: name,
      email: email,
      password: password,
      phone: phone,
    };
  
    // Opciones para la petición fetch
    const fetchOptions = {
      method: 'PUT', // Método HTTP adecuado para actualizaciones
      headers: {
        'Content-Type': 'application/json',
        // Añade más headers aquí si es necesario, como tokens de autenticación
      },
      body: JSON.stringify(userData), // Convertimos los datos del usuario a JSON
    };
  
    // Realizamos la petición
    fetch(apiUrl, fetchOptions)
      .then(response => response.json())
      .then(data => {
        // Manejo de la respuesta del servidor
        console.log('Success:', data);
        alert(data.message); // Muestra un mensaje con la respuesta del servidor
      })
      .catch((error) => {
        // Manejo de errores
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Account</Text>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth // Agrega este prop para que el TextField ocupe todo el ancho disponible
        style={styles.input}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        style={styles.input}
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        fullWidth
        style={styles.input}
      />
      <TextField
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="number"
        fullWidth
        style={styles.input}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate} // Cambia onPress por onClick
        style={styles.button}
      >
        Update
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default UpdateAccountScreen;
