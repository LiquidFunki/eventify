import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { HiSearch } from 'react-icons/hi';
import { Pagination } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EventCard } from '../components/event/EventCard';
import { Loader } from '../components/Loader';
import { Filters } from '../components/event/Filters';
import {
  changePage,
  filterEvents,
  getAllEvents,
  getCategories,
} from '../store/eventSlice';
import { DEFAULT_FILTERS, SORT_RADIOS } from '../utils/filters.utils';

export const Home = () => {
  const dispatch = useDispatch();
  const {
    events,
    filteredEvents,
    currentPageEvents,
    currentPage,
    totalPages,
    isLoading,
  } = useSelector((state) => state.event);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [localFilter, setLocalFilter] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getCategories());
  }, []);

  const changeHandler = (event) => {
    setLocalFilter({ ...localFilter, [event.target.name]: event.target.value });
  };

  const toggleOrder = () => {
    // eslint-disable-next-line no-unused-expressions
    localFilter.order === 'asc'
      ? setLocalFilter({ ...localFilter, order: 'desc' })
      : setLocalFilter({ ...localFilter, order: 'asc' });
  };

  const handlePageClick = (pageNumber) => {
    const allEvents = [...filteredEvents];
    dispatch(changePage({ page: pageNumber, events: allEvents }));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const allEvents = [...events];
    dispatch(filterEvents({ events: allEvents, filters: localFilter }));
  }, [localFilter, events]);

  if (isLoading) {
    <Loader />;
  }
  return (
    <div className='container mx-auto w-full'>
      <div className='justify-end flex flex-col-reverse lg:flex-row-reverse w-full'>
        <div className='lg:mt-6 w-full lg:w-2/3'>
          <div className='flex flex-wrap items-center justify-between mx-5 my-2'>
            <div className='w-full lg:w-1/3 border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400 mb-3 lg:mb-0'>
              <div className='flex items-center bg-white rounded-md'>
                <HiSearch color='green' size={30} className='mx-3' />
                <input
                  type='text'
                  onChange={changeHandler}
                  value={localFilter.search}
                  name='search'
                  className='w-full bg-transparent border-0 p-3 focus:outline-none focus:border-0'
                  placeholder={`${t('Search')}...`}
                />
              </div>
            </div>
            <div className='w-full lg:w-fit lg:border overflow-hidden lg:hover:border-green-300 rounded-md lg:hover:shadow-md lg:hover:shadow-green-400'>
              <div className='flex justify-between'>
                <button
                  name='order'
                  value={localFilter.order}
                  className='flex items-center justify-center text-lg h-10 lg:h-12 p-5 cursor-pointer border-b hover:bg-green-50'
                  onClick={toggleOrder}>
                  {localFilter.order === 'desc' ? '▲' : '▼'}
                </button>
                <div className='flex'>
                  {SORT_RADIOS.map((sort, index) => (
                    <button
                      key={index}
                      name='sort'
                      value={sort.value}
                      className={`${
                        localFilter.sort === sort.value ? 'bg-green-100' : ''
                      } flex items-center justify-center text-lg h-10 lg:h-12 p-5 cursor-pointer border-b hover:bg-green-50`}
                      onClick={changeHandler}>
                      {t(sort.name)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {currentPageEvents.length ? (
            <div className='flex flex-col w-full lg:mx-5 my-6'>
              {currentPageEvents.map((event) => (
                <div
                  key={event._id}
                  onClick={() => navigate(`/event/${event._id}`)}>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col w-full lg:mx-5 my-6'>
              <h1 className='text-2xl my-6'>{t('Oops! Nothing found...')}</h1>
            </div>
          )}
        </div>
        <div className='w-full lg:mt-6 mt-3 mb-3 lg:w-1/3 h-1/3 lg:h-full'>
          <div className='overflow-y-auto h-full lg:h-5/6 flex flex-col items-center lg:mr-16 border shadow-md hover:shadow-green-400 border-green-200 rounded-xl'>
            <Filters
              localFilter={localFilter}
              changeHandler={changeHandler}
              setLocalFilter={setLocalFilter}
            />
          </div>
        </div>
        <button
          className='p-1 px-3 mt-3 text-green-500 border-2 border-green-500 lg:hidden rounded-md hover:text-white hover:bg-green-500'
          onClick={() => navigate('/event/create')}>
          {t('Create event!')}
        </button>
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageClick}
        showIcons={true}
        totalPages={totalPages}
      />
    </div>
  );
};
