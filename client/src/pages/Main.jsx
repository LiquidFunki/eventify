import React, { useEffect } from 'react';
import { BiCopyright } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export const Main = () => {
  const navigate = useNavigate();
  useEffect(() => navigate('/home'), []);
  return (
    <div className='container mx-auto flex flex-col justify-center my-10'>
      <div className='flex justify-center'>
        <img src={logoImg} className='mr-3 lg:h-48 h-20 ' alt='uevent Logo' />
        <span className='self-center whitespace-nowrap lg:mx-10 lg:text-8xl text-3xl font-semibold dark:text-white'>
          Eventify
        </span>
      </div>
      <div className='flex flex-col items-center justify-center my-10'>
        <p className='lg:text-3xl'>{`"Eventify OR uAttend ?"`}</p>
        <p className='flex items-center self-end lg:mx-20 mx-9'>
          <BiCopyright className='mx-2' />me
        </p>
      </div>
    <div className='border-t'></div>
      <div className='flex flex-col items-center justify-center my-10'>
        <p className='lg:text-3xl text-xl font-bold text-green-800'
        >Start planning your life right now!</p>
      <button
            className='lg:p-8 lg:px-16 p-5 px-10 mt-8 bg-green-600 rounded-2xl text-white font-bold lg:text-3xl text-2xl shadow-lg shadow-green-300 hover:bg-green-700 animate-pulse hover:animate-none'
            onClick={() => navigate('/auth')}>
            Get Started!
          </button>
      </div>
    </div>
  );
};
