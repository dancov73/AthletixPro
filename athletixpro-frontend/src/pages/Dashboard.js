// src/pages/Dashboard.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import AthletePerformanceGraph from '../components/Dashboard/AthletePerformanceGraph';
import StatsCard from '../components/Dashboard/StatsCard'; // Update import statement

const Dashboard = () => {
  const data = [
    { date: '2023-01-01', performance: 80 },
    { date: '2023-02-01', performance: 85 },
    { date: '2023-03-01', performance: 90 },
    // Add more data points as needed
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4">Dashboard</Typography>
      <StatsCard title="Atleti" value={5} />
      <AthletePerformanceGraph data={data} />
    </Box>
  );
};

export default Dashboard;
