/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader } from '../components/Loader';
import { getCompanyEvents } from '../store/eventSlice';
import { Map } from '../components/Map';
import { formatDate } from '../utils/date.utils';
import { EventCard } from '../components/event/EventCard';
import { getCompany, setSuccessFalse } from '../store/companySlice';

export const CompanyPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation();
  const { success, companyEvents } = useSelector((state) => state.event);
  const { isLoading: companyLoading, company } = useSelector(
    (state) => state.company
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getCompanyEvents({ id }));
      dispatch(getCompany({ id }));
      dispatch(setSuccessFalse());
    }
  }, [id]);

  if (companyLoading || success) {
    return <Loader />;
  }
  return (
    <div className='container mx-auto '>
      <div className='flex flex-col lg:flex-row my-4 lg:justify-between '>
        <div className='flex lg:w-6/12 lg:p-3 w-full justify-center'>
          <img
            src={company.logoUrl}
            alt={company.name}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = 'https://www.seekpng.com/png/detail/125-1257164_search-event-fiesta-icon-png.png';
            }}
            className='w-11/12 h-auto lg:mr-4 object-cover rounded-md shadow-xl shadow-green-100'
          />
        </div>
        <div className='flex bg-white lg:w-6/12 w-full'>
          <div className='flex flex-col flex-grow p-4'>
            <h2 className='lg:text-5xl text-2xl font-bold lg:text-left'>
              {company.name}
            </h2>
            <div className='flex w-full lg:h-1/3 my-3 items-center'>
              <div className='flex flex-col items-center h-full justify-center border-r border-gray-300 w-1/2'>
                <h3 className='lg:text-lg text-lg'>
                  {t('Founded')}:
                </h3>
                <h3 className='lg:text-3xl text-xl font-bold'>
                  {formatDate(company.founded)}
                </h3>
              </div>
              <div
                onClick={() => navigate(`/user/${company.owner ? company.owner._id : ''}`)}
                className='flex mx-3 w-1/2 cursor-pointer items-center justify-center hover:shadow-md h-full rounded-md overflow-hidden'>
                <img
                  className='w-5/12 max-w-xs h-full object-cover rounded-md '
                  src={company.owner ? company.owner.avatar : ''}
                  alt={company.owner ? company.owner.fullName : ''}
                />
                <p className='text-gray-700 px-3 font-semibold text-lg'>
                  {t('by')} {company.owner ? company.owner.fullName : ''}
                </p>
              </div>
            </div>
            <Map location={JSON.parse(company.location || '{}')} />
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl font-bold text-start lg:text-3xl'>
          {t('Description')}
        </h2>
        <p className='text-start mt-1'>{company.description}</p>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl font-bold text-start lg:text-3xl'>
          {t('Company events')}
        </h2>
        <div className='flex flex-col justify-between w-full lg:mx-5 my-6'>
          {companyEvents.length ? (
            companyEvents.map((ev) => (
              <div key={ev._id} onClick={() => navigate(`/event/${ev._id}`)}>
                <EventCard event={ev} />
              </div>
            ))
          ) : (
            <div className='flex mx-5 my-6 flex-wrap'>
              <h2 className='text-xl'>{t('Oops! Nothing found...')}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
