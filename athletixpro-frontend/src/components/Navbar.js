// src/components/Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar = ({ language, setLanguage, setProfileType }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (profileType, path) => {
    setProfileType(profileType);
    navigate(path);
    handleClose();
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link to="/">
          <img 
            src={require('../assets/images/logo2.jpg')} 
            alt="Logo" 
            style={{ width: '50px', marginRight: '10px' }}
          />
        </Link>
        <Button
          component={Link}
          to="/"
          sx={{
            borderRadius: '5px', // Less rounded corners
            padding: '5px 15px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: '#212121', // Dark font color
            backgroundColor: 'inherit', // Same color as navbar
            textTransform: 'none',
            marginRight: '5px', // Add spacing between buttons
            '&:hover': {
              backgroundColor: '#e65100', // Darker orange on hover
            },
          }}
        >
          Athletix Pro
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          component={Link}
          to="/calendario-sociale"
          sx={{
            color: 'white', // Revert to previous font color
            backgroundColor: '#e65100', // Darker orange color
            marginRight: '5px', // Add spacing between buttons
            '&:hover': {
              backgroundColor: '#bf360c', // Even darker orange on hover
            },
          }}
        >
          {t('calendarioSociale')}
        </Button>
        <Button
          color="inherit"
          onClick={handleClick}
          sx={{
            color: 'white', // Revert to previous font color
            backgroundColor: '#e65100', // Darker orange color
            marginRight: '5px', // Add spacing between buttons
            '&:hover': {
              backgroundColor: '#bf360c', // Even darker orange on hover
            },
          }}
        >
          {t('profilo')}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('Amministratore', '/profilo/amministratore')}>Amministratore</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Allenatore', '/profilo/allenatore')}>Allenatore</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Atleta', '/profilo/atleta')}>Atleta</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('Genitore', '/profilo/genitore')}>Genitore</MenuItem>
        </Menu>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LanguageSelector setLanguage={setLanguage} />
        </Box>
        <Button
          color="inherit"
          component={Link}
          to="/login"
          sx={{
            color: 'white', // Revert to previous font color
            backgroundColor: '#e65100', // Darker orange color
            marginRight: '5px', // Add spacing between buttons
            '&:hover': {
              backgroundColor: '#bf360c', // Even darker orange on hover
            },
          }}
        >
          {t('login')}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
