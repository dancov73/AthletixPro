import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RegistrationDialog = ({ open, handleClose, isMinor }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('registration_pending')}</DialogTitle>
      <DialogContent>
        <Typography>
          {t('thank_you_message')}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {isMinor ? t('registration_review_message_minor') : t('registration_review_message_adult')}
        </Typography>
        <Typography sx={{ mt: 2 }}>{t('confirmation_code_message')}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">{t('ok')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegistrationDialog;
