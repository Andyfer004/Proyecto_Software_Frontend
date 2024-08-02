import React, { useState } from "react";
import NotificationService from "src/common/AlertNotification";
import moment from "moment";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// Definición de los eventos que se mostrarán en el calendario
const events = [
    {
        'title': 'All Day Event very long title', // Título del evento
        'allDay': true, // Indica que es un evento de todo el día
        'start': new Date(2024, 3, 0), // Fecha de inicio
        'end': new Date(2024, 3, 1) // Fecha de finalización
    },
    {
        'title': 'Long Event',
        'start': new Date(2024, 3, 7),
        'end': new Date(2024, 3, 10)
    },
    {
        'title': 'Some Event',
        'start': new Date(2024, 3, 9, 0, 0, 0),
        'end': new Date(2024, 3, 9, 0, 0, 0)
    },
    {
        'title': 'Conference',
        'start': new Date(2024, 3, 11),
        'end': new Date(2024, 3, 13),
        desc: 'Big conference for important people' // Descripción del evento
    },
    {
        'title': 'Meeting',
        'start': new Date(2024, 3, 12, 10, 30, 0, 0),
        'end': new Date(2024, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
        'title': 'Lunch',
        'start': new Date(2024, 3, 12, 12, 0, 0, 0),
        'end': new Date(2024, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch'
    },
    {
        'title': 'Meeting',
        'start': new Date(2024, 3, 12, 14, 0, 0, 0),
        'end': new Date(2024, 3, 12, 15, 0, 0, 0)
    },
   
]

// Componente de calendario responsive
const Calendar: React.FC = () => {
    return (
        <>
            <FullCalendar
                plugins={[ dayGridPlugin ]} // Plugins a utilizar en FullCalendar
                initialView="dayGridMonth" // Vista inicial del calendario
                weekends={false} // No mostrar los fines de semana
                events={[
                    { title: 'event 1', date: '2024-05-01' },
                    { title: 'event 2', date: '2024-05-22' },
                    {
                        title  : 'event3',
                        start  : '2024-05-07',
                        end    : '2024-05-08'
                    },
                ]}
            />
        </>
    )
};

export default Calendar; // Exporta el componente Calendar para su uso en otras partes de la aplicación
