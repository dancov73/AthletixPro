import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Tabs, Tab, MenuItem, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import countries from '../data/countries';
import RegistrationDialog from '../components/RegistrationDialog';
import axios from 'axios';

const Login = ({ setUser }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [isMinor, setIsMinor] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    nickname: '',
    password: '',
    confirmPassword: '',
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

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

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

  const validateForm = () => {
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
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = t('password_mismatch');
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

  const handleLoginClick = () => {
    // Perform login logic here
    // If login is successful, set the user and navigate to the home page
    const user = {
      name: formData.name,
      nickname: formData.nickname,
    };
    setUser(user);
    navigate('/home');
  };

  const handleRegisterClick = () => {
    if (validateForm()) {
      axios.post('/register', formData)
        .then(response => {
          console.log(response.data);
          setOpen(true);
        })
        .catch(error => {
          console.error('There was an error registering the user!', error);
        });
    }
  };

  const handleClose = () => {
    console.log("Closing dialog");
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" align="center">Benvenuto</Typography>
      <Typography variant="h3" align="center">{t('welcome_message')}</Typography>
      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label={t('login')} />
        <Tab label={t('register')} />
      </Tabs>
      {tab === 0 && (
        <Box component="form" sx={{ mt: 2 }}>
          <TextField fullWidth label={t('email')} margin="normal" required />
          <TextField
            fullWidth
            label={t('password')}
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            required
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
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLoginClick}>{t('login')}</Button>
        </Box>
      )}
      {tab === 1 && (
        <Box component="form" sx={{ mt: 2 }}>
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
            label={t('nickname')}
            margin="normal"
            name="nickname"
            value={formData.nickname}
            onChange={handleInputChange}
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
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRegisterClick}>{t('register')}</Button>
        </Box>
      )}
      <RegistrationDialog open={open} handleClose={handleClose} isMinor={isMinor} />
    </Box>
  );
};

export default Login;
