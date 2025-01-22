import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar';

const CoachDashboard = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar profileType="Coach" />
        <Container>
          <h1>Coach Dashboard</h1>
          <p>Welcome, Coach!</p>
          {/* Add your coach dashboard content here */}
        </Container>
      </Box>
    </>
  );
};

export default CoachDashboard;
