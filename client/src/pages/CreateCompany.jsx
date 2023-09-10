import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreateCompanyCard } from '../components/company/CreateCompanyCard';

export const CreateCompany = () => {
  const { t } = useTranslation();
  return (
    <div className='container mx-auto '>
      <h1 className='text-start font-bold text-2xl my-3 mx-auto ' >{t('Create company')}</h1>
      <p className='text-start  text-lg mx-auto border-b pb-2 mb-2 '>{t('createInfo')}</p>
      <CreateCompanyCard />
    </div>
  );
};
