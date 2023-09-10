import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilters } from '../../store/eventSlice';
import {
  DEFAULT_FILTERS,
  TIME_RADIOS,
  prepareCategories
} from '../../utils/filters.utils';

export const Filters = ({ localFilter, changeHandler, setLocalFilter }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const { categories } = useSelector((state) => state.event);
  const { t } = useTranslation();

  useEffect(() => {
    setDisplayedCategories(prepareCategories(categories));
  }, [categories]);

  const handleCategoryFilter = (category) => {
    const tempCategories = displayedCategories.map((value) => (value._id === category._id
      ? { ...value, isChecked: !value.isChecked }
      : { ...value }));
    setDisplayedCategories(tempCategories);
    const event = {
      target: {
        name: 'categories',
        value: tempCategories,
      },
    };
    changeHandler(event);
  };

  const clearHandler = () => {
    setDisplayedCategories(prepareCategories(categories));
    dispatch(resetFilters());
    setLocalFilter(DEFAULT_FILTERS);
  };

  return (
    <div className='filters-container w-full'>
      <button
        className='block w-full pt-2 pb-3 font-bold uppercase lg:hover:bg-transparent hover:bg-gray-100'
        onClick={() => setIsOpen(!isOpen)}>
        {t('Filters')}
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block pt-2 pb-3`}>
        <div>
          <h3 className='font-bold text-lg bg-green-50 flex justify-center items-center h-5 p-5 mb-2'>
            {t('Time')}
          </h3>
          {TIME_RADIOS.map((time, index) => (
            <button
              name='date'
              key={index}
              value={time.value}
              className={`${
                time.value === localFilter.date ? 'bg-green-100' : ''
              } flex w-full items-center text-lg h-5  p-5 pl-20 cursor-pointer border-b hover:bg-green-50`}
              onClick={changeHandler}>
              {t(time.name)}
            </button>
          ))}
        </div>
        <div className='mb-3'>
          <h3 className='font-bold text-lg bg-green-50 flex justify-center items-center h-5 p-5 mb-2 mt-2'>
            {t('Category')}
          </h3>
          {displayedCategories.map((category, index) => (
            <div
              key={index}
              className={`${
                category.isChecked ? 'bg-green-100' : ''
              } flex items-center text-lg h-5  p-5 pl-20 cursor-pointer border-b hover:bg-green-50`}
              onClick={() => handleCategoryFilter(category)}>
              <div>{t(category.name)}</div>
            </div>
          ))}
        </div>
        <button
          className='block w-full pt-2 pb-3 font-bold uppercase hover:bg-gray-100'
          onClick={clearHandler}>
          {t('Clear Filters')}
        </button>
      </div>
    </div>
  );
};
