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





export const ModalNewTask = () => {
  return (
    <div>
     <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">New task +</button>

<div className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      ...
    </div>
  </div>
</div>
    </div>
  );
};

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




const Dashboard = () => {
  
  

  return (
    <GlobalLayout>
      <Box  className='row w-100 h-100 justify-content-center mt-5'>
        <Box  className='col-md-3 align-items-center row'>
          <Box>
            <DaySelector />
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
            <div style={{margin: '0 0 30% 0'}}>
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