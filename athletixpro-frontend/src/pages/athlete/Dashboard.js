import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar';

const AthleteDashboard = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar profileType="Athlete" />
        <Container>
          <h1>Athlete Dashboard</h1>
          <p>Welcome to the athlete dashboard.</p>
          {/* Add more components and content as needed */}
        </Container>
      </Box>
    </>
  );
};

export default AthleteDashboard;