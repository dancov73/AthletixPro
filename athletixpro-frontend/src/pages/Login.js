import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import supabase from '../supabaseClient'; // Updated import path

const Login = ({ setUser, setProfileType }) => {
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

  const handleLogin = async (event) => {
    event.preventDefault();

    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes('invalid email')) {
        setErrors({ ...errors, form: t('invalid_email') });
      } else if (error.message.includes('invalid password')) {
        setErrors({ ...errors, form: t('invalid_password') });
      } else {
        setErrors({ ...errors, form: t('login_failed') });
      }
    } else if (!data.user) {
      setErrors({ ...errors, form: t('invalid_credentials') });
    } else {
      console.log('Login successful:', data.user);
      setUser(data.user);

      // Check if email is confirmed
      const user = await getUserById(data.user.id);
      if (!user || !user.is_email_confirmed) {
        setErrors({ ...errors, form: t('email_not_confirmed') });
        return;
      }

      // Fetch user role from Supabase
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('email', email)
        .single();

      if (userError) {
        console.error('Error fetching user role:', userError);
        setErrors({ ...errors, form: t('login_failed') });
      } else {
        const profileType = userData.role.map(role => role.toLowerCase());
        setProfileType(profileType); // Set profile type

        // Navigate to the unified dashboard
        navigate('/dashboard');
      }
    }
  };

  const getUserById = async (userId) => {
    const { data, error } = await supabase
      .from('users')
      .select('is_email_confirmed')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.error('Error fetching user: No rows returned');
      } else {
        console.error('Error fetching user:', error);
      }
      return null;
    }
    return data;
  };

  const fetchSupabaseLogs = async () => {
    const { data, error } = await supabase
      .from('edge_logs')
      .select('timestamp, event_message, metadata') // Removed cast function
      .limit(5);

    if (error) {
      if (error.code === '42P01') {
        console.error('Error fetching logs: Table does not exist');
      } else {
        console.error('Error fetching logs:', error);
      }
    } else {
      console.log('Supabase logs:', data);
    }
  };

  const handleLoginClick = async (event) => {
    if (validateForm()) {
      await handleLogin(event);
      await fetchSupabaseLogs(); // Fetch logs after login attempt
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
        {errors.form && (
          <Typography color="error" paragraph>
            {errors.form}
          </Typography>
        )}
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLoginClick}>{t('login')}</Button>
        <Button fullWidth component={Link} to="/register" variant="outlined" color="secondary" sx={{ mt: 2 }}>{t('register')}</Button>
      </Box>
    </Box>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setProfileType: PropTypes.func.isRequired, // Add prop type validation for setProfileType
};

export default Login;
