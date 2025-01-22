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
  const shouldHideSidebar = ['/login', '/register', '/'].includes(location.pathname.toLowerCase());

  useEffect(() => {
    if (!isSquare) {
      setOpen(true);
    }
  }, [isSquare]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menus = {
    Admin: [
      { text: 'dashboard', link: '/dashboard', icon: <DashboardIcon /> },
      { text: 'user_management', link: '/gestione-utenti', icon: <PeopleIcon /> },
      { text: 'report', link: '/report', icon: <ReportIcon /> },
      { text: 'calendar', link: '/calendario', icon: <CalendarTodayIcon /> },
      { text: 'communications', link: '/comunicazioni', icon: <MailIcon /> },
    ],
    Coach: [
      { text: 'dashboard', link: '/dashboard', icon: <DashboardIcon /> },
      { text: 'training_planning', link: '/pianificazione-allenamenti', icon: <DirectionsRunIcon /> },
      { text: 'athlete_monitoring', link: '/monitoraggio-atleti', icon: <TrendingUpIcon /> },
      { text: 'calendar', link: '/calendario', icon: <CalendarTodayIcon /> },
      { text: 'communications', link: '/comunicazioni', icon: <MailIcon /> },
    ],
    Athlete: [
      { text: 'dashboard', link: '/dashboard', icon: <DashboardIcon /> },
      { text: 'my_trainings', link: '/i-miei-allenamenti', icon: <DirectionsRunIcon /> },
      { text: 'statistics', link: '/statistiche', icon: <TrendingUpIcon /> },
      { text: 'calendar', link: '/calendario', icon: <CalendarTodayIcon /> },
      { text: 'communications', link: '/comunicazioni', icon: <MailIcon /> },
    ],
    Parent: [
      { text: 'dashboard', link: '/dashboard', icon: <DashboardIcon /> },
      { text: 'child_progress', link: '/progressi-figlio', icon: <TrendingUpIcon /> },
      { text: 'communications', link: '/comunicazioni', icon: <MailIcon /> },
      { text: 'calendar', link: '/calendario', icon: <CalendarTodayIcon /> },
    ],
  };

  const menuItems = profileType && menus[profileType] ? menus[profileType] : [];

  if (shouldHideSidebar || !menuItems.length) {
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
              {!isSquare && !isPortrait && <ListItemText primary={t(`sidebar.${item.text}`)} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
