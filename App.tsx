import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';

import LoginScreen from 'src/views/Login';
import Header from 'src/common/Header';
import Footer from 'src/common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          <Header />
          <LoginScreen />
          <Footer />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});