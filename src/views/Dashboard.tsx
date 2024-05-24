import React from 'react';
import '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import  {FunctionComponent, ReactNode, useEffect, useState} from 'react'
import Calendar from './Dashboard/Calendar';
import GlobalLayout from 'src/common/GlobalLayout';
import { Box } from '@mui/material';
import DaySelector from './Dashboard/DaySelector';
import ReactCustomizableProgressbar from './Dashboard/ReactCustomizableProgressbar';
import ModalNewTask from './Dashboard/ModalNewTask';




const Dashboard = () => {
  
  return (
    <GlobalLayout>
      <Box  className='row w-100 h-100 justify-content-center mt-5'>
        <Box  className='col-md-3 align-items-start justify-content-center row'>
          <Box>
            <div className='w-100 text-center'>
              <DaySelector />
            </div>
            <div className='w-100 justify-content-center row'>
              <ReactCustomizableProgressbar
                  radius={100}
                  progress={39}
                  strokeWidth={20}
                  strokeColor="#FFC107"
                  fillColor="none"
                  strokeLinecap="round"
                  transition="1s ease-out"
                  pointerRadius={0}
                  trackStrokeColor="#e0e0e0"
                  trackStrokeWidth={10}
                  rotate={150}
                  cut={120}
                  initialAnimation={true}
                  initialAnimationDelay={500}
                >
                  
                    <div style={{
                      position: 'absolute',  
                      top: 0,  
                      left: 0,  
                      width: '100%', 
                      height: '100%',  
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',  
                      fontSize: '20px', 
                      color: '#FFC107'  
                    }}>
                      {`${39}%`} 
                    </div>
              </ReactCustomizableProgressbar>
            </div>
            <div className='w-100 text-center'>
              <ModalNewTask  />
            </div>
          </Box>
        </Box>
        <Box className='col-md-8'>
            <Calendar/>
        </Box>
      </Box>
    </GlobalLayout>
  );
};

export default Dashboard;