import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Atleti from './pages/Atleti';
import Allenamenti from './pages/Allenamenti';
import Home from './pages/Home';
import Profilo from './pages/Profilo';
import { GlobalStyles } from './styles/global.css';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import SocialCalendar from './pages/SocialCalendar';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './pages/admin/Dashboard';
import AthleteDashboard from './pages/athlete/Dashboard';
import CoachDashboard from './pages/coach/Dashboard';
import ParentDashboard from './pages/parent/Dashboard';

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
            <Navbar language={language} setLanguage={setLanguage} user={user} /> {/* Removed setProfileType */}
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexGrow: 1 }}>
                <Sidebar language={language} profileType={profileType} /> {/* Pass profileType to Sidebar */}
                <Container sx={{ mt: { xs: 8, md: 0 }, flexGrow: 1, overflowX: 'hidden' }}> {/* Rimuovi maxWidth */}
                  <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/home" element={<Home profileType={profileType} />} /> {/* Pass profileType to Home */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/atleti" element={<Atleti />} />
                    <Route path="/allenamenti" element={<Allenamenti />} />
                    <Route path="/profilo" element={<Profilo />} />
                    <Route path="/login" element={<Login setUser={setUser} setProfileType={setProfileType} />} /> {/* Pass setProfileType to Login */}
                    <Route path="/register" element={<RegistrationForm />} /> {/* Add RegistrationForm route */}
                    <Route path="/calendario-sociale" element={<SocialCalendar />} /> {/* Add SocialCalendar route */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* Add AdminDashboard route */}
                    <Route path="/athlete/dashboard" element={<AthleteDashboard />} /> {/* Add AthleteDashboard route */}
                    <Route path="/coach/dashboard" element={<CoachDashboard />} /> {/* Add CoachDashboard route */}
                    <Route path="/parent/dashboard" element={<ParentDashboard />} /> {/* Add ParentDashboard route */}
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
