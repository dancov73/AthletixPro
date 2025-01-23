import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL; // URL del backend definito tramite variabili d'ambiente

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = t('required');
    }
    if (!formData.password) {
      tempErrors.password = t('required');
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = t('passwords_must_match');
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    try {
      const response = await axios.post(`${backendUrl}/api/register/`, { email, password }); // Use backendUrl

      if (response.data.success) {
        console.log('Registration successful:', response.data.user);
        navigate('/login'); // Navigate to login page after successful registration
      } else {
        console.error('Registration failed');
        setErrors({ ...errors, form: t('registration_failed') });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrors({ ...errors, form: t('registration_failed') });
    }
  };

  const handleRegisterClick = async (event) => {
    if (validateForm()) {
      await handleRegister(event);
    }
  };

  return (
    <>
      <nav>
        {/* Remove the "Calendario Sociale" and "Profilo" buttons */}
        {/* <Button>Calendario Sociale</Button> */}
        {/* <Button>Profilo</Button> */}
      </nav>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
        <Typography variant="h4" align="center">{t('register')}</Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label={t('email')}
            margin="normal"
            required
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label={t('password')}
            type="password"
            margin="normal"
            required
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            fullWidth
            label={t('confirm_password')}
            type="password"
            margin="normal"
            required
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          {errors.form && (
            <Typography color="error" paragraph>
              {errors.form}
            </Typography>
          )}
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRegisterClick}>{t('register')}</Button>
        </Box>
      </Box>
    </>
  );
};

export default Register;
