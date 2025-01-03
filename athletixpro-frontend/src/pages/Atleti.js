// src/pages/Atleti.js
import React from 'react';
import AthleteList from '../components/Atleti/AthleteList';
import { Box, Typography } from '@mui/material';
import ExampleComponent from '../components/ExampleComponent'; // Add this import

const Atleti = () => {
  return (
    <Box>
      <Typography variant="h4">Atleti</Typography>
      <AthleteList />
      <ExampleComponent /> {/* Add this line */}
    </Box>
  );
};

export default Atleti;
