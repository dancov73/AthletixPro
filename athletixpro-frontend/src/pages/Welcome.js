import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h3" align="center">{t('welcome_message')}</Typography>
      {/* Remove login and registration forms */}
    </Box>
  );
};

export default Welcome;
