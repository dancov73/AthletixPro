import React from 'react';
import { Box } from '@mui/material';

const MainContent = () => (
  <Box
    component="main"
    sx={{
      marginLeft: 250, // Spazio per la sidebar
      padding: 2,
      overflow: 'auto',
    }}
  >
    <h1>Pagina Principale</h1>
    <p>Testo che non viene tagliato dalla sidebar.</p>
  </Box>
);

export default MainContent;
