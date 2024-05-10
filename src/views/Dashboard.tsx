import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Card, CardBody, CardFooter, CircularProgress, Chip, progress } from '@nextui-org/react';

import  {FunctionComponent, ReactNode, useEffect, useState} from 'react'

export type ReactCustomizableProgressbarProps = {
  radius: number,
  progress: number,
  steps?: number,
  cut?: number,
  rotate?: number,
  strokeWidth?: number,
  strokeColor?: string,
  fillColor?: string,
  strokeLinecap?: 'round' | 'inherit' | 'butt' | 'square',
  transition?: string,
  pointerRadius?: number,
  pointerStrokeWidth?: number,
  pointerStrokeColor?: string,
  pointerFillColor?: string,
  trackStrokeColor?: string,
  trackStrokeWidth?: number,
  trackStrokeLinecap?: 'round' | 'inherit' | 'butt' | 'square',
  trackTransition?: string,
  counterClockwise?: boolean,
  inverse?: boolean,
  initialAnimation?: boolean,
  initialAnimationDelay?: number,
  className?: string,
  children?: ReactNode
}

const ReactCustomizableProgressbar: FunctionComponent<ReactCustomizableProgressbarProps> = ({
  radius,
  progress,
  steps,
  cut,
  rotate,
  strokeWidth,
  strokeColor,
  fillColor,
  strokeLinecap,
  transition,
  pointerRadius,
  pointerStrokeWidth,
  pointerStrokeColor,
  pointerFillColor,
  trackStrokeColor,
  trackStrokeWidth,
  trackStrokeLinecap,
  trackTransition,
  counterClockwise,
  inverse,
  initialAnimation,
  initialAnimationDelay,
  className,
  children
}) => {

  const [ animationInited, setAnimationInited ] = useState(false)

  useEffect(() => {
      let timeout: NodeJS.Timeout
      if(initialAnimation) timeout = setTimeout(() => setAnimationInited(true), initialAnimationDelay)

      return () => clearTimeout(timeout)
  }, [])

  const getProgress = () => initialAnimation && !animationInited ? 0 : progress

  const getStrokeDashoffset = (strokeLength: number) => {
      const progress = getProgress()
      const progressLength = (strokeLength / steps!) * (steps! - progress)

      if(inverse) {
          return counterClockwise ? 0 : progressLength - strokeLength
      }

      return counterClockwise ? -1 * progressLength : progressLength
  }

  const getStrokeDashArray = (strokeLength: number, circumference: number) => {
      const progress = getProgress()
      const progressLength = (strokeLength / steps!) * (steps! - progress)

      if(inverse) {
          return `${progressLength}, ${circumference}`
      }

      return counterClockwise
          ? `${strokeLength * (progress / 100)}, ${circumference}`
          : `${strokeLength}, ${circumference}`
  }

  const getTrackStrokeDashArray = (strokeLength: number, circumference: number) => {
      if(initialAnimation && !animationInited) {
          return `0, ${circumference}`
      }

      return `${strokeLength}, ${circumference}`
  }

  const getExtendedWidth = () => {
      const pointerWidth = pointerRadius! + pointerStrokeWidth!

      if(pointerWidth > strokeWidth! && pointerWidth > trackStrokeWidth!) {
          return pointerWidth * 2
      } else if(strokeWidth! > trackStrokeWidth!) {
          return strokeWidth! * 2
      }

      return trackStrokeWidth! * 2
  }

  const getPointerAngle = () => {
      const progress = getProgress()

      return counterClockwise
          ? ((360 - cut!) / steps!) * (steps! - progress)
          : ((360 - cut!) / steps!) * progress
  }

  const d = 2 * radius
  const width = d + getExtendedWidth()

  const circumference = 2 * Math.PI * radius
  const strokeLength = (circumference / 360) * (360 - cut!)

  return (
      <div
          className={`RCP ${className}`}
          style={{
              position: 'relative',
              width: `${width}px`
          }}
      >
          <svg
              width={width}
              height={width}
              viewBox={`0 0 ${width} ${width}`}
              style={{transform: `rotate(${rotate}deg)`}}
          >
              {trackStrokeWidth! > 0 && (
                  <circle
                      cx={width / 2}
                      cy={width / 2}
                      r={radius}
                      fill="none"
                      stroke={trackStrokeColor}
                      strokeWidth={trackStrokeWidth}
                      strokeDasharray={getTrackStrokeDashArray(
                          strokeLength,
                          circumference
                      )}
                      strokeLinecap={trackStrokeLinecap}
                      className="RCP__track"
                      style={{ transition: trackTransition }}
                  />
              )}
              {strokeWidth! > 0 && (
                  <circle
                      cx={width / 2}
                      cy={width / 2}
                      r={radius}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={getStrokeDashArray(
                          strokeLength,
                          circumference
                      )}
                      strokeDashoffset={getStrokeDashoffset(
                          strokeLength
                      )}
                      strokeLinecap={strokeLinecap}
                      className="RCP__progress"
                      style={{ transition }}
                  />
              )}
              {pointerRadius! > 0 && (
                  <circle
                      cx={d}
                      cy="50%"
                      r={pointerRadius}
                      fill={pointerFillColor}
                      stroke={pointerStrokeColor}
                      strokeWidth={pointerStrokeWidth}
                      className="RCP__pointer"
                      style={{
                          transformOrigin: '50% 50%',
                          transform: `rotate(${getPointerAngle()}deg) translate(${getExtendedWidth() /
                          2}px)`,
                          transition
                      }}
                  />
              )}
          </svg>

          {children || null}
      </div>
  )

}

ReactCustomizableProgressbar.defaultProps = {
  radius: 100,
  progress: 0,
  steps: 100,
  cut: 0,
  rotate: -90,

  strokeWidth: 20,
  strokeColor: 'indianred',
  fillColor: 'none',
  strokeLinecap: 'round',
  transition: '.3s ease',

  pointerRadius: 0,
  pointerStrokeWidth: 20,
  pointerStrokeColor: 'indianred',
  pointerFillColor: 'white',

  trackStrokeColor: '#e6e6e6',
  trackStrokeWidth: 20,
  trackStrokeLinecap: 'round',
  trackTransition: '.3s ease',

  counterClockwise: false,
  inverse: false,

  initialAnimation: false,
  initialAnimationDelay: 0,
  className: ''
}



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
  {/* Contenedor del texto para el porcentaje */}
  <div style={{
    position: 'absolute',  // Posicionamiento absoluto para superponer sobre el círculo
    top: 0,  // Inicia en la parte superior del contenedor
    left: 0,  // Inicia en el lado izquierdo del contenedor
    width: '100%',  // Ocupa todo el ancho del contenedor
    height: '100%',  // Ocupa toda la altura del contenedor
    display: 'flex',  // Usa flexbox para facilitar el centrado
    justifyContent: 'center',  // Centra horizontalmente
    alignItems: 'center',  // Centra verticalmente
    fontSize: '20px',  // Tamaño de fuente, ajustable según necesidad
    color: '#FFC107'  // Color del texto, igual que la barra de progreso
  }}>
    {`${39}%`}  {/* Este valor debe ser dinámico basado en el estado o props */}
  </div>
</ReactCustomizableProgressbar>


      <div style={styles.calendarContainer}>
        <BasicDateCalendar />
      </div>
    </div>
  );
};

export default Dashboard;