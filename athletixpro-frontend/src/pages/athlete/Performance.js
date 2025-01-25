
import React from 'react';
import { useTranslation } from 'react-i18next';

const AthletePerformance = () => {
  const { t } = useTranslation();

  const performanceData = {
    cpCurve: 'Dati della curva CP-W\'',
    trainingHistory: 'Storico degli allenamenti',
    fitnessPredictions: 'Previsioni di fitness',
  };

  return (
    <div>
      <h1>{t('Performance')}</h1>
      <h2>{t('Curva CP-W\'')}</h2>
      <p>{performanceData.cpCurve}</p>
      <h2>{t('Storico allenamenti')}</h2>
      <p>{performanceData.trainingHistory}</p>
      <h2>{t('Previsioni fitness')}</h2>
      <p>{performanceData.fitnessPredictions}</p>
    </div>
  );
};

export default AthletePerformance;