import React from 'react';
import { useTranslation } from 'react-i18next';

const CoachPerformance = () => {
  const { t } = useTranslation();

  const performanceData = {
    cpCurve: 'Dati della curva CP-W\'',
    trainingHistory: 'Storico degli allenamenti',
    fitnessPredictions: 'Previsioni di fitness',
  };

  const athletesData = [
    { name: 'Atleta 1', stats: 'Statistiche 1' },
    { name: 'Atleta 2', stats: 'Statistiche 2' },
  ];

  return (
    <div>
      <h1>{t('Performance')}</h1>
      <h2>{t('Curva CP-W\'')}</h2>
      <p>{performanceData.cpCurve}</p>
      <h2>{t('Storico allenamenti')}</h2>
      <p>{performanceData.trainingHistory}</p>
      <h2>{t('Previsioni fitness')}</h2>
      <p>{performanceData.fitnessPredictions}</p>
      <h2>{t('Atleti')}</h2>
      <ul>
        {athletesData.map((athlete, index) => (
          <li key={index}>{athlete.name}: {athlete.stats}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoachPerformance;
