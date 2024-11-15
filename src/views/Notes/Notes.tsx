import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import SidebarGeneral from '../../common/SidebarGeneral'; // Importa el SidebarGeneral

// Tipos de configuración de preferencias
type Preferences = {
  fontFamily: string;
  textColor: string;
  baseColor: string;
  fontSize: string;
};

const PreferencesView: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    fontFamily: 'Arial',
    textColor: '#000000',
    baseColor: '#ffffff',
    fontSize: '16px'
  });

  // Función para manejar el cambio de cualquier preferencia
  const handlePreferenceChange = (key: keyof Preferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <SidebarGeneral />

      {/* Contenido Principal */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ padding: 3, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Preferencias de la Aplicación
          </Typography>
          
          {/* Selección de fuente */}
          <Box sx={{ marginBottom: 2 }}>
            <label>Fuente:</label>
            <select
              value={preferences.fontFamily}
              onChange={e => handlePreferenceChange('fontFamily', e.target.value)}
              style={{ marginLeft: '10px' }}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
            </select>
          </Box>

          {/* Selección de tamaño de letra */}
          <Box sx={{ marginBottom: 2 }}>
            <label>Tamaño de la letra:</label>
            <select
              value={preferences.fontSize}
              onChange={e => handlePreferenceChange('fontSize', e.target.value)}
              style={{ marginLeft: '10px' }}
            >
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
            </select>
          </Box>

          {/* Color del texto */}
          <Box sx={{ marginBottom: 2 }}>
            <label>Color de la letra:</label>
            <input
              type="color"
              value={preferences.textColor}
              onChange={e => handlePreferenceChange('textColor', e.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </Box>

          {/* Color base de la aplicación */}
          <Box sx={{ marginBottom: 2 }}>
            <label>Color base de la aplicación:</label>
            <input
              type="color"
              value={preferences.baseColor}
              onChange={e => handlePreferenceChange('baseColor', e.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </Box>

          {/* Vista previa de las preferencias */}
          <Box
            sx={{
              marginTop: 3,
              padding: 2,
              backgroundColor: preferences.baseColor,
              color: preferences.textColor,
              fontFamily: preferences.fontFamily,
              fontSize: preferences.fontSize
            }}
          >
            <p>Vista previa de tus preferencias.</p>
            <p>¡Personaliza tu experiencia en la aplicación!</p>
          </Box>
        </Box>

        {/* Footer */}
        <Box component="footer" sx={{ padding: 2, backgroundColor: '#f1f1f1', textAlign: 'center' }}>
          <Divider />
          <Typography variant="body2" color="textSecondary">
            © 2024 Tu Aplicación - Todos los derechos reservados.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PreferencesView;
