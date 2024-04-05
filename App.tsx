import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from 'src/views/Login';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>HEADER</Text>
  </View>
);

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Footer</Text>
  </View>
);

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Header />
        <LoginScreen/>
        <Footer />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#a6c48a',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 36,
    position: 'absolute', // Posiciona absolutamente el header
    top: 0, // Alinea el header a la parte superior
    left: 0, // Alinea el header a la izquierda
    right: 0, 
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    height: 60,
    width: '100%',
    backgroundColor: '#e9f5db',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // Posiciona absolutamente el footer
    bottom: 0, // Alinea el footer a la parte inferior
    left: 0, // Alinea el footer a la izquierda
    right: 0, 
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
