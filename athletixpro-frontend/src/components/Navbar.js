import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar = ({ language, setLanguage, setProfileType }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuItemClick = (profileType, path) => {
    setProfileType(profileType);
    navigate(path);
    handleProfileMenuClose();
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
            borderRadius: '5px',
            padding: '5px 15px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: '#212121',
            backgroundColor: 'inherit',
            textTransform: 'none',
            marginRight: '5px',
            '&:hover': {
              backgroundColor: '#e65100',
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
        <Button
          color="inherit"
          onClick={handleProfileMenuClick}
          sx={{
            color: 'white',
            backgroundColor: '#e65100',
            marginRight: '5px',
            '&:hover': {
              backgroundColor: '#bf360c',
            },
          }}
        >
          {t('profilo')}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={() => handleProfileMenuItemClick('Admin', '/profilo?type=Admin')}>{t('admin')}</MenuItem>
          <MenuItem onClick={() => handleProfileMenuItemClick('Coach', '/profilo?type=Coach')}>{t('coach')}</MenuItem>
          <MenuItem onClick={() => handleProfileMenuItemClick('Athlete', '/profilo?type=Athlete')}>{t('athlete')}</MenuItem>
          <MenuItem onClick={() => handleProfileMenuItemClick('Parent', '/profilo?type=Parent')}>{t('parent')}</MenuItem>
        </Menu>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LanguageSelector setLanguage={setLanguage} />
        </Box>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
