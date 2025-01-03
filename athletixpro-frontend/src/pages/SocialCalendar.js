import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  // Esempio di eventi
  { title: 'Gara 1', start: new Date(), end: new Date(), type: 'Gara', category: 'Senior' },
  { title: 'Evento 1', start: new Date(), end: new Date(), type: 'Evento', category: 'Junior' },
];

const SocialCalendar = () => {
  const [eventType, setEventType] = useState('');
  const [athleteCategory, setAthleteCategory] = useState('');

  const filteredEvents = events.filter(event => 
    (eventType ? event.type === eventType : true) &&
    (athleteCategory ? event.category === athleteCategory : true)
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Calendario Sociale
      </Typography>
      <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
        <InputLabel>Tipo Evento</InputLabel>
        <Select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <MenuItem value=""><em>Tutti</em></MenuItem>
          <MenuItem value="Gara">Gara</MenuItem>
          <MenuItem value="Evento">Evento</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Categoria Atleta</InputLabel>
        <Select
          value={athleteCategory}
          onChange={(e) => setAthleteCategory(e.target.value)}
        >
          <MenuItem value=""><em>Tutti</em></MenuItem>
          <MenuItem value="Senior">Senior</MenuItem>
          <MenuItem value="Junior">Junior</MenuItem>
        </Select>
      </FormControl>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, marginTop: 20 }}
      />
    </Box>
  );
};

export default SocialCalendar;
