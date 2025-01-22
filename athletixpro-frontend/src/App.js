import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Atleti from './pages/Atleti';
import Allenamenti from './pages/Allenamenti'; // Update import statement
import Home from './pages/Home';
import Profilo from './pages/Profilo';
import { GlobalStyles } from './styles/global.css';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import Welcome from './pages/Welcome';
import Login from './pages/Login'; // Import the Login component
import AdminDashboard from './pages/admin/Dashboard'; // Update import statement
import CoachDashboard from './pages/coach/Dashboard'; // Update import statement
import AthleteDashboard from './pages/athlete/Dashboard'; // Update import statement
import ParentDashboard from './pages/parent/Dashboard'; // Update import statement
import SocialCalendar from './pages/SocialCalendar'; // Import the SocialCalendar component
import RegistrationForm from './components/RegistrationForm'; // Import the RegistrationForm component

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
  const [profileType, setProfileType] = useState('Atleta'); // Add profileType state
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
                    <Route path="/home" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/atleti" element={<Atleti />} />
                    <Route path="/allenamenti" element={<Allenamenti />} />
                    <Route path="/profilo" element={<Profilo />} />
                    <Route path="/login" element={<Login setUser={setUser} />} /> {/* Add Login route */}
                    <Route path="/register" element={<RegistrationForm />} /> {/* Add RegistrationForm route */}
                    <Route path="/admin-profile" element={<AdminDashboard />} /> {/* Update route */}
                    <Route path="/coach-profile" element={<CoachDashboard />} /> {/* Update route */}
                    <Route path="/athlete-profile" element={<AthleteDashboard />} /> {/* Update route */}
                    <Route path="/parent-profile" element={<ParentDashboard />} /> {/* Update route */}
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
