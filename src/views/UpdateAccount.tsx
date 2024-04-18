import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextField } from "@mui/material";

const UpdateAccountScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleUpdate = () => {
    // Aquí puedes implementar la lógica para enviar la información actualizada a tu servidor o almacenarla localmente.
    console.log(name, email, password, phone);
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
