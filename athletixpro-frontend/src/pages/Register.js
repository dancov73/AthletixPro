import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RegistrationForm from '../components/RegistrationForm'; // Import RegistrationForm component
import RegistrationDialog from '../components/RegistrationDialog'; // Import RegistrationDialog component
import supabase from '../supabaseClient'; // Import supabase client

const Register = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isMinor, setIsMinor] = useState(false);

  const handleRegisterClick = async (formData) => {
    // Handle registration logic here
    const { email, password, id, ...profileData } = formData;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Errore durante la registrazione:', error.message);
    } else {
      console.log('Registrazione effettuata:', data.user);
      const { error: profileError } = await supabase
        .from('users')
        .insert([{ id, ...profileData, user_id: data.user.id }]);

      if (profileError) {
        console.error('Errore durante l\'inserimento del profilo:', profileError.message);
      } else {
        console.log('Profilo inserito correttamente:', profileData);
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" align="center">Benvenuto</Typography>
      <Typography variant="h3" align="center">{t('welcome_message')}</Typography>
      <RegistrationForm onSubmit={handleRegisterClick} setIsMinor={setIsMinor} />
      <RegistrationDialog open={open} handleClose={handleClose} isMinor={isMinor} />
    </Box>
  );
};

export default Register;
