import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, IconButton, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Sidebar = ({ language, profileType }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down('sm'));
  const isSquare = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isSquare) {
      setOpen(true);
    }
  }, [isSquare]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMouseEnter = () => {
    if (isSquare) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isSquare) {
      setOpen(false);
    }
  };

  const menus = {
    Amministratore: [
      { text: 'Dashboard', link: '/dashboard', icon: <DashboardIcon /> },
      { text: 'Gestione Utenti', link: '/gestione-utenti', icon: <PeopleIcon /> },
      { text: 'Report', link: '/report', icon: <ReportIcon /> },
      { text: 'Calendario', link: '/calendario', icon: <CalendarTodayIcon /> },
      { text: 'Comunicazioni', link: '/comunicazioni', icon: <MailIcon /> },
    ],
    Allenatore: [
      { text: 'Dashboard', link: '/dashboard', icon: <DashboardIcon /> },
      { text: 'Pianificazione Allenamenti', link: '/pianificazione-allenamenti', icon: <DirectionsRunIcon /> },
      { text: 'Monitoraggio Atleti', link: '/monitoraggio-atleti', icon: <TrendingUpIcon /> },
      { text: 'Calendario', link: '/calendario', icon: <CalendarTodayIcon /> },
      { text: 'Comunicazioni', link: '/comunicazioni', icon: <MailIcon /> },
    ],
    Atleta: [
      { text: 'Dashboard', link: '/dashboard', icon: <DashboardIcon /> },
      { text: 'I miei Allenamenti', link: '/i-miei-allenamenti', icon: <DirectionsRunIcon /> },
      { text: 'Statistiche', link: '/statistiche', icon: <TrendingUpIcon /> },
      { text: 'Calendario', link: '/calendario', icon: <CalendarTodayIcon /> },
      { text: 'Comunicazioni', link: '/comunicazioni', icon: <MailIcon /> },
    ],
    Genitore: [
      { text: 'Dashboard', link: '/dashboard', icon: <DashboardIcon /> },
      { text: 'Progressi Figlio', link: '/progressi-figlio', icon: <TrendingUpIcon /> },
      { text: 'Comunicazioni', link: '/comunicazioni', icon: <MailIcon /> },
      { text: 'Calendario', link: '/calendario', icon: <CalendarTodayIcon /> },
    ],
  };

  const menuItems = menus[profileType] || [];

  return (
    <>
      {isSquare && (
        <Box
          sx={{
            width: '2px',
            height: 'calc(100vh - 74px - 10px)', // Altezza esattamente come la sidebar
            position: 'fixed',
            left: '5px', // Distanza di 5px dal lato sinistro
            top: '74px',
            zIndex: 1200,
            backgroundColor: '#aaa', // Colore più chiaro
            cursor: 'pointer',
          }}
          onMouseEnter={handleMouseEnter}
        />
      )}
      <Drawer
        variant={isSquare ? 'temporary' : 'permanent'}
        open={isSquare ? open : true}
        onClose={handleDrawerToggle}
        onMouseLeave={handleMouseLeave}
        sx={{
          width: isPortrait ? '100%' : isSquare ? '48px' : 'clamp(150px, 15vw, 200px)', // Riduci la larghezza in modalità quadrato
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isPortrait ? '100%' : isSquare ? '48px' : 'clamp(150px, 15vw, 200px)', // Riduci la larghezza in modalità quadrato
            boxSizing: 'border-box',
            marginTop: isPortrait ? 0 : '10px',
            height: isPortrait ? 'auto' : 'calc(100vh - 74px - 10px)',
            position: isPortrait ? 'fixed' : 'relative',
            top: isPortrait ? 'auto' : '74px',
            bottom: isPortrait ? 0 : 'auto',
            display: 'flex',
            flexDirection: isPortrait ? 'row' : 'column',
            alignItems: 'center',
          },
        }}
        anchor={isPortrait ? 'bottom' : 'left'}
      >
        <List sx={{ display: 'flex', flexDirection: isPortrait ? 'row' : 'column' }}>
          {menuItems.map((item, index) => (
            <ListItem button component={Link} to={item.link} key={index}>
              <ListItemIcon sx={{ minWidth: '36px' }}>{item.icon}</ListItemIcon> {/* Riduci lo spazio tra icona e voce */}
              {!isSquare && !isPortrait && <ListItemText primary={t(item.text)} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
