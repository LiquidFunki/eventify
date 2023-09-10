import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { HiSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllCompanies } from '../store/companySlice';
import { Loader } from '../components/Loader';
import { CompanyCard } from '../components/company/CompanyCard';

export const Companies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [displayedCompanies, setDisplayedCompanies] = useState([]);
  const { companies, isLoading } = useSelector((state) => state.company);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllCompanies());
  }, []);

  useEffect(() => {
    setDisplayedCompanies(companies);
  }, [companies]);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    const tempTags = [...companies];
    setDisplayedCompanies(
      tempTags.filter((value) => value.name.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  if (isLoading) {
    <Loader />;
  }
  return (
    <div className='container m-auto w-full'>
      {/* <div className='overflow-y-auto lg:mt-6 h-3/6 lg:h-5/6 w-full'> */}
      <div className='flex flex-col lg:flex-row mx-5 my-2 justify-between'>
        <div className='flex mx-5 my-2 items-center'>
          <h1 className='text-2xl my-2'>{t('Don`t have a company?')}</h1>
          <button
            className='p-1 mx-4 px-3 bg-green-600 rounded-md text-white hover:bg-green-700 animate-pulse hover:animate-none'
            onClick={() => navigate('/companies/create')}>
            {t('Create company!')}
          </button>
        </div>
        <div className='flex items-center justify-center w-full lg:w-1/3 border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
          <HiSearch color='green' size='30' className='mx-3' />
          <input
            type='text'
            onChange={searchHandler}
            value={search}
            name='search'
            className='w-full bg-transparent border-0 p-3 focus:outline-none focus:border-0'
            placeholder={`${t('Search')}...`}
          />
        </div>
      </div>
      {displayedCompanies.length ? (
        <div className='flex flex-col w-full lg:mx-5 my-6'>
          {displayedCompanies.map((company, idx) => (
            <div
              key={company._id}
              onClick={() => navigate(`/companies/${company._id}`)}>
              <CompanyCard key={idx} company={company} />
            </div>
          ))}
        </div>
      ) : (
        <div className='flex mx-5 my-6 flex-wrap'>
          <h2 className='text-xl'>{t('Oops! Nothing found...')}</h2>
        </div>
      )}
      {/* </div> */}
    </div>
  );
};
