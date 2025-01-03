import React from 'react';
import { MenuItem, Select, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({ setLanguage }) => {
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    setLanguage(selectedLanguage);
  };

  const getFlagIcon = (language) => {
    switch (language) {
      case 'en':
        return '🇬🇧';
      case 'it':
        return '🇮🇹';
      case 'es':
        return '🇪🇸';
      case 'fr':
        return '🇫🇷';
      case 'de':
        return '🇩🇪';
      case 'pt':
        return '🇵🇹';
      case 'gr':
        return '🇬🇷';
      case 'nl':
        return '🇳🇱';
      default:
        return '🌐';
    }
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleChange}
      variant="outlined"
      size="small"
      sx={{ color: 'white', borderColor: 'white' }}
      renderValue={(value) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <span>{getFlagIcon(value)}</span>
        </Box>
      )}
    >
      <MenuItem value="en">🇬🇧 English</MenuItem>
      <MenuItem value="it">🇮🇹 Italiano</MenuItem>
      <MenuItem value="es">🇪🇸 Español</MenuItem>
      <MenuItem value="fr">🇫🇷 Français</MenuItem>
      <MenuItem value="de">🇩🇪 Deutsch</MenuItem>
      <MenuItem value="pt">🇵🇹 Português</MenuItem>
      <MenuItem value="gr">🇬🇷 Ελληνικά</MenuItem>
      <MenuItem value="nl">🇳🇱 Nederlands</MenuItem>
    </Select>
  );
};

export default LanguageSelector;