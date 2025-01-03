import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import AthletePerformanceGraph from '../components/Dashboard/PerformanceGraph';
import { getAthleteProfile, getAdminProfile, getCoachProfile, getParentProfile } from '../services/profileService';
import { useLocation, useNavigate } from 'react-router-dom';

const Profilo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialProfileType = queryParams.get('type') || 'Atleta';

  const [profileType, setProfileType] = useState(initialProfileType);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        let data;
        switch (profileType) {
          case 'Amministratore':
            data = await getAdminProfile();
            break;
          case 'Allenatore':
            data = await getCoachProfile();
            break;
          case 'Genitore':
            data = await getParentProfile();
            break;
          case 'Atleta':
          default:
            data = await getAthleteProfile();
            break;
        }
        setProfileData(data);
      } catch (error) {
        console.error(`Errore nel caricamento dei dati del profilo ${profileType}`, error);
      }
    };

    fetchProfileData();
  }, [profileType]);

  const handleProfileTypeChange = (event) => {
    const newProfileType = event.target.value;
    setProfileType(newProfileType);
    navigate(`/profilo?type=${newProfileType}`);
  };

  if (!profileData) {
    return (
      <Box>
        <Typography variant="h4">Caricamento...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel id="profile-type-label">Tipo di Profilo</InputLabel>
        <Select
          labelId="profile-type-label"
          value={profileType}
          label="Tipo di Profilo"
          onChange={handleProfileTypeChange}
        >
          <MenuItem value="Amministratore">Amministratore</MenuItem>
          <MenuItem value="Allenatore">Allenatore</MenuItem>
          <MenuItem value="Atleta">Atleta</MenuItem>
          <MenuItem value="Genitore">Genitore</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h4" gutterBottom>
        Profilo di {profileData.name}
      </Typography>
      <Typography variant="body1" paragraph>
        Età: {profileData.age} anni
      </Typography>
      <Typography variant="body1" paragraph>
        Categoria: {profileData.category}
      </Typography>
      <Typography variant="body1" paragraph>
        Specializzazione: {profileData.specialization}
      </Typography>
      <Typography variant="body1" paragraph>
        VO2max: {profileData.vo2max}
      </Typography>

      <Card sx={{ marginTop: 2 }}>
        <CardContent>
          <Typography variant="h6">Le migliori prestazioni:</Typography>
          <ul>
            {profileData.bestPerformances.map((performance, index) => (
              <li key={index}>{performance.event}: {performance.time}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" gutterBottom>
          Grafico delle performance
        </Typography>
        <AthletePerformanceGraph data={profileData.performanceData} />
      </Box>
    </Box>
  );
};

export default Profilo;

