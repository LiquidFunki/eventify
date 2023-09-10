import React from 'react';
import moment from 'moment';
import { Avatar, Tooltip } from 'flowbite-react';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaBirthdayCake } from 'react-icons/fa';
import { HiAtSymbol } from 'react-icons/hi';
import { MdLabel } from 'react-icons/md';

export const ProfileCard = ({ user }) => (
  <div className='flex flex-col w-full p-5'>
    <div className='flex items-center justify-center w-full pb-3'>
      <Avatar alt='User avatar' img={user.avatar} rounded={true} size='xl' />
    </div>
    <div className='flex border-t w-11/12  mx-3 my-2 border-t-green-400  p-2 px-4 hover:bg-gradient-to-br from-green-100 animate-appear'>
      <div className='flex h-full items-center w-2/12 font-bold mb-2 py-1 text-xl'>
        <Tooltip content={'login'}>
          <BsFillPersonFill color='green' className='mx-1' />
        </Tooltip>
      </div>
      <div className='w-10/12 flex h-full items-center justify-start'>
        {user.fullName}
      </div>
    </div>
    <div className='flex border-t w-11/12  mx-3 my-2 border-t-green-400  p-2 px-4 hover:bg-gradient-to-br from-green-100 animate-appear'>
      <div className='flex h-full items-center w-2/12 font-bold mb-2 py-1 text-xl'>
        <Tooltip content={'email'}>
          <HiAtSymbol color='green' className='mx-1' />
        </Tooltip>
      </div>
      <div className='w-10/12 flex h-full items-center justify-start'>
        {user.email}
      </div>
    </div>
    <div className='flex border-t w-11/12  mx-3 my-2 border-t-green-400  p-2 px-4 hover:bg-gradient-to-br from-green-100 animate-appear'>
      <div className='flex h-full items-center w-2/12 font-bold mb-2 py-1 text-xl'>
        <Tooltip content={'Full Name'}>
          <MdLabel color='green' className='mx-1' />
        </Tooltip>
      </div>
      <div className='w-10/12 flex h-full items-center justify-start'>
        {user.events ? user.events.length : ''} event(s) subscribed
      </div>
    </div>
    <div className='flex border-t w-11/12  mx-3 my-2 border-t-green-400  p-2 px-4 hover:bg-gradient-to-br from-green-100 animate-appear'>
      <div className='flex h-full items-center w-2/12 font-bold mb-2 py-1 text-xl'>
        <Tooltip content={'Registration date'}>
          <FaBirthdayCake color='green' className='mx-1' />
        </Tooltip>
      </div>
      <div className='w-10/12 flex h-full items-center justify-start'>
        {`Member for ${moment(user.createdAt).fromNow().slice(0, -3)}`}
      </div>
    </div>
  </div>
);
