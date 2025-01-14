import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import schermata1 from '../assets/images/schermata1.jpeg'; // Import the image

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <Box 
      sx={{ 
        position: 'relative', // Make the Box fill the entire screen
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        minHeight: '100vh', // Ensure the background image is visible
        backgroundImage: `url(${schermata1})`, // Use the imported image
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat' // Ensure the image does not repeat
      }}
    >
      <Typography 
        variant="h3" 
        align="center" 
        sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          fontWeight: 'bold', 
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add semi-transparent black background
          padding: '10px', // Add some padding for better readability
          borderRadius: '5px' // Optional: Add border radius for rounded corners
        }}
      >
        {t('welcome_message')}
      </Typography>
      {/* Remove login and registration forms */}
    </Box>
  );
};

export default Welcome;
