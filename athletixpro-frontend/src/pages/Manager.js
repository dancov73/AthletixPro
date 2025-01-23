
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Manager = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" align="center">{t('manager')}</Typography>
      {/* Add your manager page content here */}
    </Box>
  );
};

export default Manager;