import React from 'react';
import { BsGithub, BsInstagram, BsTelegram, BsTwitter } from 'react-icons/bs';
import { AiOutlineCopyright } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className='w-full border-t p-4 mt-10'>
      <div className='container mx-auto flex w-full flex-col lg:flex-row '>
        <div className='flex lg:w-5/12 lg:justify-between flex-col lg:flex-row'>
          <div
            className='flex items-center'
            onClick={() => {
              navigate('/');
            }}>
            <img src={logoImg} className='mr-3 h-6 sm:h-9' alt='uevent Logo' />
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
              Eventify
            </span>
          </div>
          <div className='flex flex-col items-end'>
            <a
              href='https://github.com/Vlad-Makarenko'
              className='my-3 mx-2'
              target='_blank'
              rel='noreferrer'>
              vmakarenko
            </a>
            <div className='flex lg:flex-row-reverse'>
              <a
                href='https://github.com/Vlad-Makarenko'
                target='_blank'
                rel='noreferrer'>
                <BsGithub className='mx-3' />
              </a>
              <a
                href='https://t.me/VladMakarenko'
                target='_blank'
                rel='noreferrer'>
                <BsTelegram className='mx-3' />
              </a>
              <a
                href='https://www.instagram.com/_vlad_makarenko_'
                target='_blank'
                rel='noreferrer'>
                <BsInstagram className='mx-3' />
              </a>
              <a
                href='https://twitter.com/_Vlad_Makarenko'
                target='_blank'
                rel='noreferrer'>
                <BsTwitter className='mx-3' />
              </a>
            </div>
          </div>
        </div>
        <div className='w-2/12 lg:flex h-20 justify-center hidden'>
          <div className='border-l'></div>
        </div>
        <div className='flex lg:w-5/12 lg:justify-between flex-col lg:flex-row'>
          <div className='flex flex-col items-end lg:items-start'>
            <a
              href='https://github.com/LiquidFunki'
              className='my-3 mx-2'
              target='_blank'
              rel='noreferrer'>
              yklymenko
            </a>
            <div className='flex'>
              <a
                href='https://github.com/LiquidFunki'
                target='_blank'
                rel='noreferrer'>
                <BsGithub className='mx-3' />
              </a>
              <a
                href='https://t.me/yurahasatrigger'
                target='_blank'
                rel='noreferrer'>
                <BsTelegram className='mx-3' />
              </a>
              <a
                href='https://www.instagram.com/yurahasatrigger'
                target='_blank'
                rel='noreferrer'>
                <BsInstagram className='mx-3' />
              </a>
              <a href='https://twitter.com' target='_blank' rel='noreferrer'>
                <BsTwitter className='mx-3' />
              </a>
            </div>
          </div>
          <div className='flex items-center'>
            <AiOutlineCopyright className='mx-2' />
            <span className=''>Eventify 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
};
