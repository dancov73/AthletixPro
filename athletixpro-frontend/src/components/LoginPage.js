import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // ...existing code...
  };

  const handleRegisterClick = () => {
    history.push('/register');
  };

  return (
    <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
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
      <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} type="submit">{t('login')}</Button>
      <Button fullWidth variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handleRegisterClick}>{t('register')}</Button>
    </Box>
  );
};

export default LoginPage;
