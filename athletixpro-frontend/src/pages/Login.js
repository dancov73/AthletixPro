import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Import supabase client

const Login = ({ setUser }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLoginClick = async () => {
    if (validateForm()) {
      const { email, password } = formData;
      const { data, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        console.error('Errore durante il login:', error.message);
      } else {
        console.log('Login effettuato:', data.user);
        setUser(data.user);
        navigate('/dashboard');
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" align="center">{t('login')}</Typography>
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
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          required
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLoginClick}>{t('login')}</Button>
        <Button fullWidth component={Link} to="/register" variant="outlined" color="secondary" sx={{ mt: 2 }}>{t('register')}</Button>
      </Box>
    </Box>
  );
};

export default Login;
