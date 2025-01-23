import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import AthletePerformanceGraph from '../components/Dashboard/PerformanceGraph';
import { getAthleteProfile, getAdminProfile, getCoachProfile, getParentProfile } from '../services/profileService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Profilo = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialProfileType = queryParams.get('type') || 'Athlete';

  const [profileType, setProfileType] = useState(initialProfileType);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        let data;
        switch (profileType) {
          case 'Admin':
            data = await getAdminProfile();
            break;
          case 'Coach':
            data = await getCoachProfile();
            break;
          case 'Parent':
            data = await getParentProfile();
            break;
          case 'Athlete':
          default:
            data = await getAthleteProfile();
            break;
        }
        setProfileData(data);
      } catch (error) {
        console.error(`Error loading profile data for ${profileType}`, error);
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
        <Typography variant="h4">{t('loading')}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel id="profile-type-label">{t('profile_type')}</InputLabel>
        <Select
          labelId="profile-type-label"
          value={profileType}
          label={t('profile_type')}
          onChange={handleProfileTypeChange}
        >
          <MenuItem value="Admin">{t('admin')}</MenuItem>
          <MenuItem value="Coach">{t('coach')}</MenuItem>
          <MenuItem value="Athlete">{t('athlete')}</MenuItem>
          <MenuItem value="Parent">{t('parent')}</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h4" gutterBottom>
        {t('profile_of')} {profileData.name}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('age')}: {profileData.age} {t('years')}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('category')}: {profileData.category}
      </Typography>
      <Typography variant="body1" paragraph>
        {t('specialization')}: {profileData.specialization}
      </Typography>
      <Typography variant="body1" paragraph>
        VO2max: {profileData.vo2max}
      </Typography>

      <Card sx={{ marginTop: 2 }}>
        <CardContent>
          <Typography variant="h6">{t('best_performances')}:</Typography>
          <ul>
            {profileData.bestPerformances.map((performance, index) => (
              <li key={index}>{performance.event}: {performance.time}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('performance_graph')}
        </Typography>
        <AthletePerformanceGraph data={profileData.performanceData} />
      </Box>
    </Box>
  );
};

export default Profilo;

