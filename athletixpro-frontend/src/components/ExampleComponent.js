import React from 'react';
import { useTranslation } from 'react-i18next';

const ExampleComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome_message')}</h1>
      <button>{t('button_save')}</button>
    </div>
  );
};

export default ExampleComponent;
