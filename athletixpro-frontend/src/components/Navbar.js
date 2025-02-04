import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Box, MenuItem, IconButton, Avatar, Typography, Menu } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@mui/icons-material'; // Import Notifications icon
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import supabase from '../supabaseClient'; // Import supabase client
import logo from '../assets/images/logo09.png'; // Import logo

const Navbar = ({ language, setLanguage, user, setProfileType, setUser, toggleSidebar }) => { // Add toggleSidebar
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [roles, setRoles] = useState([]);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null); // Add state for user menu
  const [menuAnchorEl, setMenuAnchorEl] = useState(null); // Add state for menu
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
    handleUserMenuClose(); // Close the menu on logout
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const getPageName = () => {
    switch (location.pathname) {
      case '/dashboard':
        return t('dashboard');
      case '/athlete/monitor':
        return t('athleteMonitor');
      case '/calendario-sociale':
        return t('calendarioSociale');
      case '/about':
        return 'About';
      case '/calendar':
        return 'Calendar';
      case '/performance':
        return 'Performance';
      case '/social-calendar':
        return 'Social Calendar';
      case '/welcome':
        return 'Welcome';
      default:
        return 'Athletix Pro';
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="logo" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <img src={logo} alt="logo" style={{ width: 40, height: 40 }} />
        </IconButton>
        <IconButton edge="start" color="inherit" aria-label="menu1" sx={{ mr: 2 }} onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/about" onClick={handleMenuClose}>
            About
          </MenuItem>
          <MenuItem component={Link} to="/calendar" onClick={handleMenuClose}>
            Calendar
          </MenuItem>
          <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
            Dashboard
          </MenuItem>
          <MenuItem component={Link} to="/performance" onClick={handleMenuClose}>
            Performance
          </MenuItem>
          <MenuItem component={Link} to="/social-calendar" onClick={handleMenuClose}>
            Social Calendar
          </MenuItem>
          <MenuItem component={Link} to="/welcome" onClick={handleMenuClose}>
            Welcome
          </MenuItem>
        </Menu>
        <Box sx={{ flexGrow: 1 }} /> {/* Add this line to push the button to the center */}
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
          {getPageName()}
        </Button>
        
            {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && !user && (
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
        {!user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LanguageSelector setLanguage={setLanguage} sx={{ border: 'none' }} />
          </Box>
        )}
        {user ? (
          <>
            <Box sx={{ flexGrow: 1 }} /> {/* Add this line to push the buttons to the right */}
            <IconButton color="inherit" sx={{ ml: 2 }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleUserMenuOpen}
              sx={{
                padding: '5px', // Reduce padding
                ml: 2, // Add margin-left to create space between buttons
                '&:hover': {
                  backgroundColor: 'transparent', // Remove background color on hover
                },
              }}
            >
              <Avatar alt={user.email} src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30 }} /> {/* Reduce avatar size */}
            </IconButton>
            <Menu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={handleUserMenuClose}>
                <LanguageSelector setLanguage={setLanguage} sx={{ border: 'none' }} />
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                {t('logout')}
              </MenuItem>
            </Menu>
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
