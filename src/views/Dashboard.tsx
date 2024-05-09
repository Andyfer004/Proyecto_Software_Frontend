import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const BasicDateCalendar = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
  );
};

const Dashboard = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#00000' 
    },
    calendarContainer: {
      margin: '8%',
      maxWidth: '40%', 
      width:'40%',
      backgroundColor: 'rgba(70, 117, 206, 0.8)', 
      color: 'white', // Color de texto para el calendario
      padding: '20px', // Espacio interior alrededor del calendario
      borderRadius: '5px', // Bordes redondeados
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Sombra suave para destacarlo
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.calendarContainer}>
        <BasicDateCalendar />
      </div>
    </div>
  );
};

export default Dashboard;