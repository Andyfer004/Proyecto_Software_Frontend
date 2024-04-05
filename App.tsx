import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from 'src/views/Login';
import Header from 'src/common/Header';
import Footer from 'src/common/Footer';



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
});
