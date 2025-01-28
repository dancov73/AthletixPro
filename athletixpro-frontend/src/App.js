import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Calendar from './pages/Calendar';
import { GlobalStyles } from './styles/global.css';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import SocialCalendar from './pages/SocialCalendar';
import RegistrationForm from './components/RegistrationForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6600',
    },
    secondary: {
      main: '#333333',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

function App() {
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState(null); // Add user state
  const [profileType, setProfileType] = useState(''); // Initialize profileType state
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <I18nextProvider i18n={i18n}>
          <Router>
            <Navbar language={language} setLanguage={setLanguage} user={user} setProfileType={setProfileType} setUser={setUser} /> {/* Pass setUser */}
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexGrow: 1 }}>
                <Sidebar language={language} profileType={profileType} /> {/* Pass profileType to Sidebar */}
                <Container sx={{ mt: { xs: 8, md: 0 }, flexGrow: 1, overflowX: 'hidden' }}> {/* Rimuovi maxWidth */}
                  <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/login" element={<Login setUser={setUser} setProfileType={setProfileType} />} /> {/* Pass setProfileType to Login */}
                    <Route path="/register" element={<RegistrationForm />} /> {/* Add RegistrationForm route */}
                    <Route path="/calendario-sociale" element={<SocialCalendar />} /> {/* Add SocialCalendar route */}
                  </Routes>
                </Container>
              </Box>
            </Box>
          </Router>
        </I18nextProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
