import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, IconButton, Box, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const shouldHideSidebar = ['/login', '/register'].includes(location.pathname.toLowerCase());

  useEffect(() => {
    if (!isSquare) {
      setOpen(true);
    }
  }, [isSquare]);

  const handleDrawerToggle = () => {
    setOpen(!open);
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

  const menuItems = profileType && location.pathname.toLowerCase() !== '/welcome' ? menus[profileType] : [];

  if (shouldHideSidebar) {
    return null;
  }

  return (
    <>
      <Drawer
        variant={isSquare ? 'permanent' : 'permanent'}
        open={true}
        onClose={handleDrawerToggle}
        sx={{
          width: isPortrait ? '100%' : isSquare ? '48px' : 'clamp(150px, 15vw, 200px)',
          flexShrink: 0,
          zIndex: isSquare ? 1200 : 1300,
          '& .MuiDrawer-paper': {
            width: isPortrait ? '100%' : isSquare ? '48px' : 'clamp(150px, 15vw, 200px)',
            boxSizing: 'border-box',
            marginTop: isPortrait ? 0 : '10px',
            height: isPortrait ? 'auto' : 'calc(100vh - 74px - 10px)',
            position: isPortrait ? 'fixed' : isSquare ? 'fixed' : 'fixed', // Fix position in landscape mode
            top: isPortrait ? 'auto' : isSquare ? '74px' : '74px',
            bottom: isPortrait ? 0 : 'auto',
            display: 'flex',
            flexDirection: isPortrait ? 'row' : 'column',
            alignItems: 'center',
            zIndex: 1300,
            justifyContent: 'space-between',
            left: 0, // Ensure the sidebar is fixed to the left
          },
        }}
        anchor={isPortrait ? 'bottom' : 'left'}
      >
        <List sx={{ display: 'flex', flexDirection: isPortrait ? 'row' : 'column', flexGrow: 1 }}>
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
