import React, { useEffect, useState } from 'react';
import '@mui/material/styles';
import Calendar from './Dashboard/Calendar';
import GlobalLayout from '../../src/common/GlobalLayout';
import { Box } from '@mui/material';
import DaySelector from './Dashboard/DaySelector';
import ReactCustomizableProgressbar from './Dashboard/ReactCustomizableProgressbar';
import ModalNewTask from './Dashboard/ModalNewTask';
import Reminders from './Dashboard/Reminders';
import { getProfiles } from '../../src/api/profileApi'; // Asume que tienes esta función para obtener perfiles

const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);

  // Obtener perfiles desde la API
  useEffect(() => {
        
      if (selectedProfile) {
        setSelectedProfile(selectedProfile);
      } 

  }, [selectedProfile]);

  return (
    <GlobalLayout>
      <Box className='row w-100 h-100 justify-content-center mt-5'>
        <Box className='col-md-3 align-items-start justify-content-center row'>
          <Box>
            <div className='w-100 text-center'>
              <DaySelector />
            </div>
            <div className='w-100 justify-content-center row m-0'>
              <Reminders />
            </div>
            <div className='w-100 justify-content-center row'>
              <ReactCustomizableProgressbar
                value={75}
                valueMax={100}
                startAngle={-110}
                endAngle={110}
                textSize={40}
                height={200}
                gaugeSx={{ color: 'indianred' }}
              />
            </div>
            <div className='w-100 text-center'>
              {/* Pasamos los perfiles y el perfil seleccionado como props */}
              <ModalNewTask
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
              />
            </div>
          </Box>
        </Box>
        <Box className='col-md-8'>
          {/* Pasamos los perfiles y el perfil seleccionado como props */}
          <Calendar
            selectedProfile={selectedProfile}
          />
        </Box>
      </Box>
    </GlobalLayout>
  );
};

export default Dashboard;
