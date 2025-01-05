import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RegistrationForm from '../components/RegistrationForm'; // Import RegistrationForm component
import RegistrationDialog from '../components/RegistrationDialog'; // Import RegistrationDialog component
import { registerUser } from '../supabaseClient'; // Import registerUser function

const Register = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterClick = async (formData) => {
    // Handle registration logic here
    const { email, password, id, ...profileData } = formData;
    const { data, error } = await registerUser(email, password);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await registerUser(email, password);
    if (error) {
      console.error('Error registering user:', error);
    } else {
      console.log('User registered successfully');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" align="center">Benvenuto</Typography>
      <Typography variant="h3" align="center">{t('welcome_message')}</Typography>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <RegistrationForm onSubmit={handleRegisterClick} setIsMinor={setIsMinor} />
      <RegistrationDialog open={open} handleClose={handleClose} isMinor={isMinor} />
    </Box>
  );
};

export default Register;
