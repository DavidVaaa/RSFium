//npm install react-big-calendar

import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Header from '../components/header';
import axios from 'axios';

const Calendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Realizar la solicitud GET a tu API
    axios.get('/api/events/').then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div className="calendar">
      <Header />
      <h2 id="title">Calendario</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Calendar;
