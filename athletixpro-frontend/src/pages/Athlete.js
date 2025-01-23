import React from 'react';
import AthleteList from '../components/Athletes/AthleteList'; // Corrected import path
import { Box, Typography } from '@mui/material';
import ExampleComponent from '../components/ExampleComponent';

const Athletes = () => {
  return (
    <Box>
      <Typography variant="h4">Athletes</Typography>
      <AthleteList />
      <ExampleComponent />
    </Box>
  );
};

export default Athletes;
