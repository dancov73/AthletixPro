import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import supabase from '../supabaseClient'; // Import supabase client

const User = ({ user }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: user.email,
    name: '',
    role: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('name, role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
      } else {
        setFormData({ ...formData, name: data.name, role: data.role });
      }
    };

    fetchUserData();
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const { data, error } = await supabase
      .from('users')
      .update({ name: formData.name, role: formData.role })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating user data:', error);
      setMessage(t('update_failed'));
    } else {
      setMessage(t('update_successful'));
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" align="center">{t('user_profile')}</Typography>
      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label={t('email')}
          margin="normal"
          name="email"
          value={formData.email}
          disabled
        />
        <TextField
          fullWidth
          label={t('name')}
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          label={t('role')}
          margin="normal"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        />
        {message && (
          <Typography color="primary" paragraph>
            {message}
          </Typography>
        )}
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>{t('save')}</Button>
      </Box>
    </Box>
  );
};

export default User;
