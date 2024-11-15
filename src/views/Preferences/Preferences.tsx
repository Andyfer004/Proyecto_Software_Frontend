import React, { useState } from 'react';
import { Box, Typography, Divider, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import GlobalLayout from 'src/common/GlobalLayout';

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
    fontSize: '16px',
  });

  const handlePreferenceChange = (key: keyof Preferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <GlobalLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, mt: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Configuración de Preferencias
        </Typography>
        
        <Paper elevation={3} sx={{ width: '80%', p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#555', mb: 2 }}>
            Personalización de Apariencia
          </Typography>

          {/* Selección de Fuente */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Fuente</InputLabel>
            <Select
              value={preferences.fontFamily}
              onChange={(e) => handlePreferenceChange('fontFamily', e.target.value)}
              label="Fuente"
            >
              <MenuItem value="Arial">Arial</MenuItem>
              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
              <MenuItem value="Courier New">Courier New</MenuItem>
              <MenuItem value="Verdana">Verdana</MenuItem>
            </Select>
          </FormControl>

          {/* Selección de Tamaño de Letra */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Tamaño de la letra</InputLabel>
            <Select
              value={preferences.fontSize}
              onChange={(e) => handlePreferenceChange('fontSize', e.target.value)}
              label="Tamaño de la letra"
            >
              <MenuItem value="14px">14px</MenuItem>
              <MenuItem value="16px">16px</MenuItem>
              <MenuItem value="18px">18px</MenuItem>
              <MenuItem value="20px">20px</MenuItem>
            </Select>
          </FormControl>

          {/* Selección de Color de Texto */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: '#666', mb: 1 }}>Color de la letra:</Typography>
            <input
              type="color"
              value={preferences.textColor}
              onChange={(e) => handlePreferenceChange('textColor', e.target.value)}
              style={{ width: '100%', height: '40px', border: 'none', cursor: 'pointer' }}
            />
          </Box>

          {/* Selección de Color Base */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: '#666', mb: 1 }}>Color base de la aplicación:</Typography>
            <input
              type="color"
              value={preferences.baseColor}
              onChange={(e) => handlePreferenceChange('baseColor', e.target.value)}
              style={{ width: '100%', height: '40px', border: 'none', cursor: 'pointer' }}
            />
          </Box>
          
          {/* Vista previa */}
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#555', mb: 2 }}>
            Vista previa
          </Typography>
          <Box
            sx={{
              padding: 3,
              borderRadius: 2,
              backgroundColor: preferences.baseColor,
              color: preferences.textColor,
              fontFamily: preferences.fontFamily,
              fontSize: preferences.fontSize,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <p>Así se verá tu configuración de preferencias en la aplicación.</p>
            <p>¡Explora y personaliza para una mejor experiencia!</p>
          </Box>
        </Paper>
      </Box>
    </GlobalLayout>
  );
};

export default PreferencesView;
