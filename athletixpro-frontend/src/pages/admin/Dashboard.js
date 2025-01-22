import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Sidebar from '../../components/Sidebar';

const AdminDashboard = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar profileType="Admin" />
        <Container>
          <h1>Admin Dashboard</h1>
          <p>Welcome, Admin!</p>
          {/* Add your admin dashboard content here */}
        </Container>
      </Box>
    </>
  );
};

export default AdminDashboard;