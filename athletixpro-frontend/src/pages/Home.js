// src/pages/Home.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // Per interazioni aggiuntive
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t, i18n } = useTranslation();

  const customDayHeaderContent = (args) => {
    const daysOfWeekShort = t('daysOfWeekShort', { returnObjects: true });
    return daysOfWeekShort[args.date.getUTCDay()];
  };

  return (
    <Box>
      <FullCalendar 
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]} 
        initialView="dayGridMonth" 
        firstDay={1} // Set the first day of the week to Monday
        locale={i18n.language} // Set the locale based on the selected language
        dayHeaderContent={customDayHeaderContent} // Use custom day header content
      />
    </Box>
  );
};

export default Home;
