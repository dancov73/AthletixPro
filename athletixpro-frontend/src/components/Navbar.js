import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, MenuItem, IconButton, Avatar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import supabase from '../supabaseClient'; // Import supabase client

const Navbar = ({ language, setLanguage, user, setProfileType, setUser }) => { // Add setUser
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchRoles = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            console.error('Error fetching roles: No rows returned');
          } else {
            console.error('Error fetching roles:', error);
          }
          setRoles([]);
        } else {
          setRoles(data.role ? data.role.split(',') : []); // Ensure roles are split into an array
        }
      }
    };

    fetchRoles();
  }, [user]);

  const handleRoleSelect = (role) => {
    setProfileType(role.toLowerCase());
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error);
      } else {
        console.log('Logout successful'); // Add console log for debugging
        setUser(null);
        setProfileType('');
        navigate('/login'); // Navigate to login page after logout
      }
    } catch (err) {
      console.error('Unexpected error during logout:', err);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu1" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Link to="/">
          {/* Removed athlete icon */}
        </Link>
        <Button
          component={Link}
          to="/"
          sx={{
            borderRadius: '5px',
            padding: '5px 15px',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#212121',
            backgroundColor: 'inherit',
            textTransform: 'none',
            marginRight: '5px',
            opacity: 0.8,
            '&:hover': {
              backgroundColor: '#e65100',
            },
            '@media (orientation: portrait)': {
              fontSize: '1.5rem',
            },
          }}
        >
          Athletix Pro
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && (
          <>
            <Button
              color="inherit"
              component={Link}
              to="/calendario-sociale"
              sx={{
                color: 'white',
                backgroundColor: '#e65100',
                marginRight: '5px',
                '&:hover': {
                  backgroundColor: '#bf360c',
                },
              }}
            >
              {t('calendarioSociale')}
            </Button>
          </>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LanguageSelector setLanguage={setLanguage} sx={{ border: 'none' }} />
        </Box>
        {user ? (
          <>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                color: 'white',
                backgroundColor: '#e65100',
                marginLeft: '10px',
                '&:hover': {
                  backgroundColor: '#bf360c',
                },
              }}
            >
              {t('logout')}
            </Button>
            {user && (
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                <Avatar alt={user.email} src="/static/images/avatar/1.jpg" />
                <Box sx={{ marginLeft: '10px', color: 'white' }}>
                  <Typography variant="body2">{user.roles && user.roles.join(', ')}</Typography>
                </Box>
              </Box>
            )}
          </>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to="/login"
            sx={{
              color: 'white',
              backgroundColor: '#e65100',
              marginRight: '5px',
              '&:hover': {
                backgroundColor: '#bf360c',
              },
            }}
          >
            {t('login')}
          </Button>
        )}
        {/* Removed IconButton for "More" menu */}
        {/* Removed Menu component for "More" menu */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
