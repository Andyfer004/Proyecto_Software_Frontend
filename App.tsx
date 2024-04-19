import React from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from 'src/views/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SidebarGeneral from 'src/common/SidebarGeneral';
import Box from '@mui/material/Box';
import DashboardScreen from 'src/views/Dashboard';
import UpdateAccountScreen from 'src/views/UpdateAccount';

const Stack = createNativeStackNavigator();



export default function App() {
  

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
          <SidebarGeneral/>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UpdateAccount" component={UpdateAccountScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
