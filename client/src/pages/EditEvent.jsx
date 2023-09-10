import React from 'react';
import { useTranslation } from 'react-i18next';
import { EditEventForm } from '../components/event/EditEventForm';

export const EditEvent = () => {
  const { t } = useTranslation();
  return (
    <div className='container mx-auto '>
      <h1 className='text-start font-bold text-2xl my-3 mx-auto ' >{t('Edit event')}</h1>
      <EditEventForm />
    </div>
  );
};
