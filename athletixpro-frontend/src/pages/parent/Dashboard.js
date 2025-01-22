import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar';

const ParentDashboard = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar profileType="Parent" />
        <Container>
          <h1>Parent Dashboard</h1>
          <p>Welcome to the parent dashboard.</p>
          {/* Add more components and content as needed */}
        </Container>
      </Box>
    </>
  );
};

export default ParentDashboard;