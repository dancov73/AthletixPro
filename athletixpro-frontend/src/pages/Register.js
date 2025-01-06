import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RegistrationForm from '../components/RegistrationForm'; // Import RegistrationForm component
import RegistrationDialog from '../components/RegistrationDialog'; // Import RegistrationDialog component
import { registerUser } from '../supabaseClient'; // Import registerUser function
import { supabase } from '../supabaseClient'; // Import supabase client

const Register = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterClick = async (formData) => {
    console.log('handleRegisterClick called with formData:', formData);
    const { email, password, fullName, ...profileData } = formData; // Removed id
    console.log('Registering user with email:', email);
    const { data, error } = await registerUser(email, password, fullName);

    if (error) {
      console.error('Errore durante la registrazione:', error.message);
    } else if (data && data.user) {
      console.log('Registrazione effettuata:', data.user);
      const { error: profileError } = await supabase
        .from('users')
        .insert([{ ...profileData, user_id: data.user.id }]); // Removed id

      if (profileError) {
        console.error('Errore durante l\'inserimento del profilo:', profileError.message);
      } else {
        console.log('Profilo inserito correttamente:', profileData);
        setOpen(true);
      }
    } else {
      console.error('User data is undefined');
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

spabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vaghxwrrxlmcisldfaed.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhZ2h4d3JyeGxtY2lzbGRmYWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MzY1NjcsImV4cCI6MjA1MTUxMjU2N30.hIOdolYs20Qnepf7bxASA_AUSDpGo5UWEX3dMN0U12A';
export const supabase = createClient(supabaseUrl, supabaseKey);

export const registerUser = async (email, password, fullName) => {
  console.log('Received data:', { email, password, fullName });

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error during sign up:', error.message);
      return { data: null, error };
    }
    console.log('Sign up data:', data);

    // Aggiorna la tabella users con i dati aggiuntivi
    const { data: dbData, error: dbError } = await supabase
      .from('users')
      .insert([{ id: data.user.id, email, full_name: fullName }]);

    if (dbError) {
      console.error('Error inserting data:', dbError);
      return { error: dbError.message };
    }

    console.log('Data inserted successfully:', dbData);
    return { message: 'User registered successfully', data: dbData };
  } catch (error) {
    console.error('Unexpected error during sign up:', error.message);
    return { data: null, error };
  }
};
