import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import LoginScreen from 'src/views/Login';
import RegisterScreen from 'src/views/Register';

export default function App() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <View style={styles.container}>
      {showLogin ? (
        <>
          <LoginScreen />
          <Button title="Ir a Registro" onPress={() => setShowLogin(false)} />
        </>
      ) : (
        <>
          <RegisterScreen />
          <Button title="Volver a Login" onPress={() => setShowLogin(true)} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
