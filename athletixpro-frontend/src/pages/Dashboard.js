import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import PropTypes from 'prop-types';

const Dashboard = ({ profileType }) => {
  const renderContent = () => {
    switch (profileType) {
      case 'admin':
        return (
          <>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin!</p>
            {/* Add your admin dashboard content here */}
          </>
        );
      case 'athlete':
        return (
          <>
            <h1>Athlete Dashboard</h1>
            <p>Welcome to the athlete dashboard.</p>
            {/* Add more components and content as needed */}
          </>
        );
      case 'coach':
        return (
          <>
            <h1>Coach Dashboard</h1>
            <p>Welcome, Coach!</p>
            {/* Add your coach dashboard content here */}
          </>
        );
      case 'parent':
        return (
          <>
            <h1>Parent Dashboard</h1>
            <p>Welcome to the parent dashboard.</p>
            {/* Add more components and content as needed */}
          </>
        );
      default:
        return <p>Invalid profile type</p>;
    }
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar profileType={profileType} />
        <Container>
          {renderContent()}
        </Container>
      </Box>
    </>
  );
};

Dashboard.propTypes = {
  profileType: PropTypes.string.isRequired,
};

export default Dashboard;
