import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SidebarGeneral from './src/common/SidebarGeneral';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginScreen from './src/views/Login';
import Dashboard from './src/views/Dashboard';
import UpdateAccountScreen from './src/views/UpdateAccount';
import Notes from './src/views/Notes/Notes';
import ProtectedRoute from './src/common/ProtectedRoute';

const Stack = createNativeStackNavigator();

// Función para agregar una navegación web compatible para la simulación en la web.
const WebNavigation = () => (
  <Router>
    <ToastContainer />
    <SidebarGeneral />
    <Routes>
      {/* Rutas no protegidas */}
      <Route path="/login" element={<LoginScreen />} />
      
      {/* Rutas protegidas por el componente ProtectedRoute */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/update-account" element={<UpdateAccountScreen />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Route>

    </Routes>
  </Router>
);

// Función para la navegación móvil usando @react-navigation/native
const MobileNavigation = () => (
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

export default function App() {
  // Verificar la plataforma y seleccionar la navegación apropiada
  return Platform.OS === 'web' ? <WebNavigation /> : <MobileNavigation />;
}
