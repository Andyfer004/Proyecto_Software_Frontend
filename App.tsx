import React from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from 'src/views/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SidebarGeneral from 'src/common/SidebarGeneral';


const Stack = createNativeStackNavigator();



export default function App() {
  

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
          <SidebarGeneral/>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
