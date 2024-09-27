import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextField, Card, CardContent, Typography } from "@mui/material";

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
    maxWidth: 500, // Ancho máximo de la tarjeta
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
