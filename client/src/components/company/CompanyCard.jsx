import React from 'react';
import { BiLink } from 'react-icons/bi';
import { formatDate } from '../../utils/date.utils';

export const CompanyCard = ({ company }) => (
  <div className='w-full mx-auto flex flex-col lg:flex-row cursor-pointer my-5 border-green-400 rounded-lg overflow-hidden shadow-md hover:shadow-green-400 animate-appear'>
    {/* <div className='max-w-md mx-auto my-4 rounded-lg overflow-hidden shadow-md'> */}
    <img
      className='lg:w-5/12 w-full h-64 object-cover'
      src={company.logoUrl}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = 'https://www.seekpng.com/png/detail/125-1257164_search-event-fiesta-icon-png.png';
      }}
      alt={company.name}
    />
    <div className='flex flex-col lg:w-7/12 px-4 justify-between my-3'>
      <h2 className='text-xl font-bold mb-2 self-start'>{company.name}</h2>
      <p className='text-gray-700 text-sm mb-4 self-start text-left'>
        {company.description.length > 150
          ? `${company.description.slice(0, 150)}...`
          : company.description}
      </p>
      <p className='text-gray-700 text-sm mb-4  self-start'>
        {formatDate(company.founded)}
      </p>
      <div className='text-gray-700 flex self-start text-sm mb-4'>
        <BiLink />
        <a href={company.websiteUrl} className='text-gray-700 text-sm'>
          {company.websiteUrl.length > 150
            ? `${company.description.slice(0, 150)}...`
            : company.websiteUrl}
        </a>
      </div>
      {/* <div className='flex items-center justify-between'>
        <p className='text-gray-700 text-sm'>
          {company.price > 0 ? `₴${company.price}` : 'Free'}
        </p>
        <p className='text-gray-700 text-sm'>
          {company.attendees.length}/{company.maxAttendees}
        </p>
      </div> */}
    </div>
  </div>
);
