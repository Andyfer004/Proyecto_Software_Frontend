import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

export type ReactCustomizableProgressbarProps = {
    value: number,
    valueMax?: number,
    startAngle?: number,
    endAngle?: number,
    textSize?: number,
    gaugeSx?: any,
    className?: string,
    height?: string | number,
    animationDuration?: number, // Tiempo de la animación
    children?: ReactNode
}

const ReactCustomizableProgressbar: FunctionComponent<ReactCustomizableProgressbarProps> = ({
    value,
    valueMax = 100,
    startAngle = -110,
    endAngle = 110,
    textSize = 40,
    gaugeSx = {},
    className = '',
    height = 200,
    animationDuration = 2000, // Duración predeterminada de 2 segundos
    children
  }) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        let start = 0;
        const step = (timestamp: number) => {
            start = start || timestamp;
            const progress = Math.min((timestamp - start) / animationDuration, 1);
            setAnimatedValue(value * progress);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }, [value, animationDuration]);

    return (
        <div className={`custom-gauge ${className}`} style={{ position: 'relative', textAlign: 'center', height }}>
            <Gauge
                value={animatedValue} // Utiliza el valor animado
                valueMax={valueMax}
                startAngle={startAngle}
                endAngle={endAngle}
                sx={{
                    height: '100%', 
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: textSize,
                        transform: 'translate(0px, 0px)',
                    },
                    ...gaugeSx,
                }}
                text={
                    ({ value, valueMax }) => `${Math.round(value || 0)} / ${valueMax || 0}` // Redondear el valor animado
                }
            />
            {children}
        </div>
    );
}

export default ReactCustomizableProgressbar;
