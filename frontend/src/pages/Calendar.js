import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import Header from '../components/header';
import axios from './axiosConfig';
import { useAuth } from '../AuthContext';

const Calendar = () => {
    const { user } = useAuth();
    const [userEvents, setUserEvents] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`/api/evaluaciones/fechas/${user.userId}`).then((response) => {
                setUserEvents(response.data);
            });
        }
    }, [user]);

    const events = userEvents.map((evaluation) => ({
        title: evaluation.nombre,
        start: evaluation.fecha,
        end: evaluation.fecha,
    }));

    // Agrega eventos estáticos
    const staticEvents = [
        {
            title: 'HC Parcial Ing Software',
            start: '2023-10-03',
            end: '2023-10-03',
        },
        {
            title: 'HC Defensa TIC 3',
            start: '2023-10-15',
            end: '2023-10-17',
        },
        {
            title: 'HC Parcial Teoria de la computacion',
            start: '2023-11-18',
            end: '2023-11-18',
        },
    ];

    return (
        <div className="calendar">
            <Header />
            <h2 id="title">Calendario</h2>
            <div id="calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={[...events, ...staticEvents]}
                    locale={esLocale}
                />
            </div>
        </div>
    );
};

export default Calendar;
