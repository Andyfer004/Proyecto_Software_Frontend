import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SidebarGeneral from 'src/common/SidebarGeneral';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginScreen from 'src/views/Login';
import Dashboard from 'src/views/Dashboard';
import UpdateAccountScreen from 'src/views/UpdateAccount';
import Notes from 'src/views/Notes/Notes';

const Stack = createNativeStackNavigator();

export default function App() {
  if (Platform.OS === 'web') {
    // Configuración para la web usando react-router-dom
    return (
      <Router>
        <ToastContainer />
        <SidebarGeneral />
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/update-account" element={<UpdateAccountScreen />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="*" element={<Navigate to="/home" />} /> {/* Ruta por defecto */}
        </Routes>
      </Router>
    );
  }

  // Configuración para móvil usando @react-navigation/native
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <ToastContainer />
      <SidebarGeneral />
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateAccount" component={UpdateAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="home" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="notes" component={Notes} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
