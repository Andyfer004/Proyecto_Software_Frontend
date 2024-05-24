import React, { useState } from "react";
import NotificationService from "src/common/AlertNotification";
import moment from "moment";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


const events = [
    {
        'title': 'All Day Event very long title',
        'allDay': true,
        'start': new Date(2024, 3, 0),
        'end': new Date(2024, 3, 1)
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
        desc: 'Big conference for important people'
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


const Calendar: React.FC = () => {

    return (
        <>
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                weekends={false}
                events={[
                    { title: 'event 1', date: '2024-05-01' },
                    { title: 'event 2', date: '2024-05-22' }
                ]}
            />
        </>
    )

};

export default Calendar;