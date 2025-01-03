import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = ({ message }) => {
  return (
    <Box component="footer" sx={{ textAlign: 'center', mt: 4, flexShrink: 0 }}>
      <Typography variant="body2">
        {message}
      </Typography>
    </Box>
  );
};

export default Footer;
