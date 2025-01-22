import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { Menu as MenuIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

const Navbar = ({ language, setLanguage }) => { // Removed setProfileType
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMoreMenuClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreAnchorEl(null);
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
        <IconButton
          edge="end"
          color="inherit"
          aria-label="more"
          onClick={handleMoreMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={moreAnchorEl}
          open={Boolean(moreAnchorEl)}
          onClose={handleMoreMenuClose}
        >
          <MenuItem onClick={handleMoreMenuClose}>{t('option1')}</MenuItem>
          <MenuItem onClick={handleMoreMenuClose}>{t('option2')}</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
