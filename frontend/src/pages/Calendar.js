import React from 'react';
import Header from '../components/header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es'; // Importa la localización en español

const Calendar = () => {
    return (
        <div className="calendar">
            <Header />
            <h2 id="title">Calendario</h2>
            <div id="calendar-container">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth" 
                    events={[
                        {
                            title: 'Parcial Ing Software',
                            start: '2023-10-03',
                            end: '2023-10-03',
                        },
                        {
                            title: 'Defensa TIC 3',
                            start: '2023-10-15',
                            end: '2023-10-17',
                        },
                        {
                            title: 'Parcial Teoria de la computacion',
                            start: '2023-11-18',
                            end: '2023-11-18',
                        }
                    ]}
                    locale={esLocale} // Configura la localización en español
                />
            </div>
        </div>
    );
};

export default Calendar;


