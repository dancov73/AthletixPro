import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Coach = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" align="center">{t('coach')}</Typography>
      {/* Add your coach page content here */}
    </Box>
  );
};

export default Coach;
