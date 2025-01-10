import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, IconButton, InputAdornment, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import countries from '../data/countries';
import { supabase } from '../supabaseClient'; // Import Supabase client from a separate file

const RegistrationForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMinor, setIsMinor] = useState(false); // Define isMinor state
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '', 
    confirmPassword: '', // Added confirmPassword
    country: '',
    team: '',
    sector: '',
    role: '',
    dateOfBirth: '',
    parentName: '',
    parentSurname: '',
    parentPhone: '',
    parentEmail: ''
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleDateOfBirthChange = (event) => {
    const birthDate = new Date(event.target.value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    setIsMinor(age < 18);
    setFormData({ ...formData, dateOfBirth: event.target.value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCountryChange = (event) => {
    const selectedCountry = countries.find(country => country.name === event.target.value);
    setFormData({
      ...formData,
      country: selectedCountry.name,
      phone: selectedCountry.prefix
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[+\d\s]+$/;
    return phoneRegex.test(phone);
  };

  const isPhoneEmpty = (phone) => {
    const phoneWithoutSpaces = phone.replace(/\s+/g, '');
    return phoneWithoutSpaces === '' || phoneWithoutSpaces === formData.country;
  };

  const validateForm = async () => {
    let tempErrors = {};
    if (!formData.name) {
      tempErrors.name = t('required');
    } else if (!validateName(formData.name)) {
      tempErrors.name = t('invalid_name');
    }
    if (!formData.surname) {
      tempErrors.surname = t('required');
    } else if (!validateName(formData.surname)) {
      tempErrors.surname = t('invalid_surname');
    }
    if (!formData.email) {
      tempErrors.email = t('required');
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = t('invalid_email');
    }
    if (!isPhoneEmpty(formData.phone) && !validatePhone(formData.phone)) {
      tempErrors.phone = t('invalid_phone');
    }
    if (!formData.password) tempErrors.password = t('required');
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = t('passwords_do_not_match');
    }
    if (!formData.country) tempErrors.country = t('required');
    if (!formData.team) tempErrors.team = t('required');
    if (!formData.sector) tempErrors.sector = t('required');
    if (!formData.role) tempErrors.role = t('required');
    if (!formData.dateOfBirth) tempErrors.dateOfBirth = t('required');
    if (isMinor) {
      if (!formData.parentName) {
        tempErrors.parentName = t('required');
      } else if (!validateName(formData.parentName)) {
        tempErrors.parentName = t('invalid_name');
      }
      if (!formData.parentSurname) {
        tempErrors.parentSurname = t('required');
      } else if (!validateName(formData.parentSurname)) {
        tempErrors.parentSurname = t('invalid_surname');
      }
      if (!isPhoneEmpty(formData.parentPhone) && !validatePhone(formData.parentPhone)) {
        tempErrors.parentPhone = t('invalid_phone');
      }
      if (!formData.parentEmail) {
        tempErrors.parentEmail = t('required');
      } else if (!validateEmail(formData.parentEmail)) {
        tempErrors.parentEmail = t('invalid_email');
      }
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
    if (await validateForm()) {
      console.log('Form validation passed');
      const userData = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone || null,
        country: formData.country,
        team: formData.team,
        sector: formData.sector,
        role: formData.role,
        dateOfBirth: formData.dateOfBirth,
        parentName: formData.parentName || null,
        parentSurname: formData.parentSurname || null,
        parentPhone: formData.parentPhone || null,
        parentEmail: formData.parentEmail || null
      };

      try {
        console.log('Attempting to sign up user:', formData.email);
        const { data: user, error: signupError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (signupError) {
          console.error('Signup error:', signupError);
          setErrors({ submit: signupError.message });
          setAlert({ type: 'error', message: signupError.message });
          return;
        }

        console.log('User signed up successfully:', user);
        console.log('Attempting to insert user data:', userData);
        const { data, error } = await supabase
          .from('users')
          .insert([userData]);

        if (error) {
          console.error('Error inserting user:', error);
          setErrors({ submit: t('data_insert_failed') });
          setAlert({ type: 'error', message: `${t('data_insert_failed')}: ${error.message}` });
        } else {
          console.log('User registered successfully:', data);
          setAlert({ type: 'success', message: t('registration_successful') });
          if (typeof onSubmit === 'function') {
            onSubmit(formData);
          } else {
            console.error('onSubmit is not a function');
          }
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setErrors({ submit: t('unexpected_error') });
        setAlert({ type: 'error', message: `${t('unexpected_error')}: ${error.message}` });
      }
    } else {
      console.log('Form validation failed', errors);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
      {alert.message && (
        <Alert severity={alert.type} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}
      <TextField
        fullWidth
        label={t('name')}
        margin="normal"
        required
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        fullWidth
        label={t('surname')}
        margin="normal"
        required
        name="surname"
        value={formData.surname}
        onChange={handleInputChange}
        error={!!errors.surname}
        helperText={errors.surname}
      />
      <TextField
        fullWidth
        select
        label={t('country')}
        margin="normal"
        required
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        error={!!errors.country}
        helperText={errors.country}
      >
        {countries.map((country) => (
          <MenuItem key={country.code} value={country.name}>
            {country.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label={t('phone')}
        margin="normal"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        error={!!errors.phone}
        helperText={errors.phone}
      />
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
        label={t('team')}
        margin="normal"
        required
        name="team"
        value={formData.team}
        onChange={handleInputChange}
        error={!!errors.team}
        helperText={errors.team}
      />
      <TextField
        fullWidth
        select
        label={t('sector')}
        margin="normal"
        required
        name="sector"
        value={formData.sector}
        onChange={handleInputChange}
        error={!!errors.sector}
        helperText={errors.sector}
      >
        <MenuItem value="giovanile">{t('youth')}</MenuItem>
        <MenuItem value="master">{t('master')}</MenuItem>
      </TextField>
      <TextField
        fullWidth
        select
        label={t('role')}
        margin="normal"
        required
        name="role"
        value={formData.role}
        onChange={handleInputChange}
        error={!!errors.role}
        helperText={errors.role}
      >
        <MenuItem value="atleta">{t('athlete')}</MenuItem>
        <MenuItem value="allenatore">{t('coach')}</MenuItem>
        <MenuItem value="coordinatore">{t('coordinator')}</MenuItem>
        <MenuItem value="dirigente">{t('manager')}</MenuItem>
      </TextField>
      <TextField
        fullWidth
        label={t('date_of_birth')}
        type="date"
        InputLabelProps={{ shrink: true }}
        margin="normal"
        required
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleDateOfBirthChange}
        error={!!errors.dateOfBirth}
        helperText={errors.dateOfBirth}
      />
      {isMinor && (
        <>
          <TextField
            fullWidth
            label={t('parent_name')}
            margin="normal"
            required
            name="parentName"
            value={formData.parentName}
            onChange={handleInputChange}
            error={!!errors.parentName}
            helperText={errors.parentName}
          />
          <TextField
            fullWidth
            label={t('parent_surname')}
            margin="normal"
            required
            name="parentSurname"
            value={formData.parentSurname}
            onChange={handleInputChange}
            error={!!errors.parentSurname}
            helperText={errors.parentSurname}
          />
          <TextField
            fullWidth
            label={t('parent_phone')}
            margin="normal"
            name="parentPhone"
            value={formData.parentPhone}
            onChange={handleInputChange}
            error={!!errors.parentPhone}
            helperText={errors.parentPhone}
          />
          <TextField
            fullWidth
            label={t('parent_email')}
            margin="normal"
            required
            name="parentEmail"
            value={formData.parentEmail}
            onChange={handleInputChange}
            error={!!errors.parentEmail}
            helperText={errors.parentEmail}
          />
        </>
      )}
      <TextField
        fullWidth
        label={t('password')}
        type={showPassword ? 'text' : 'password'}
        margin="normal"
        required
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        label={t('confirm_password')}
        type={showConfirmPassword ? 'text' : 'password'}
        margin="normal"
        required
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowConfirmPassword}>
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">{t('register')}</Button>
    </Box>
  );
};

export default RegistrationForm;