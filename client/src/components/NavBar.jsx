import React, { useEffect, useState } from 'react';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { BiPowerOff, BiUserCircle } from 'react-icons/bi';
import { GoGear } from 'react-icons/go';
import { BsCalendarRangeFill } from 'react-icons/bs';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdEventAvailable } from 'react-icons/md';
import { Switch, useDarkreader } from 'react-darkreader';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logOut } from '../store/authSlice';
import logoImg from '../assets/logo.png';
import uaFlag from '../assets/ua-flag.png';
import enFlag from '../assets/en-flag.png';
import { settingsOn } from '../store/modalSlice';

export const NavBar = () => {
  const [active, setActive] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { me, isAuthenticated } = useSelector((state) => state.auth);
  const [isDark, { toggle }] = useDarkreader(
    localStorage.getItem('theme') === 'true'
  );
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  useEffect(() => {
    i18n.changeLanguage(
      localStorage.getItem('language') === 'uk' ? 'uk' : 'en'
    );
  }, []);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  useEffect(() => {
    localStorage.setItem('theme', isDark);
  }, [isDark]);

  return (
    <Navbar rounded={true} className='border-b shadow-md shadow-green-200'>
      <Navbar.Brand >
        <img
          onClick={() => navigate('/')}
          src={logoImg}
          className='mr-3 h-6 sm:h-9 cursor-pointer'
          alt='uevent Logo'
        />
        <span onClick={() => navigate('/')} className='self-center whitespace-nowrap text-xl font-semibold dark:text-white cursor-pointer'>
          Eventify
        </span>
        <div className='lg:mx-4 mx-2 flex items-center'>
          {i18n.language === 'uk' ? (
            <button onClick={() => changeLanguage('en')}>
              <img src={enFlag} alt='English' width='35' />
            </button>
          ) : (
            <button onClick={() => changeLanguage('uk')}>
              <img src={uaFlag} alt='Українська' width='35' />
            </button>
          )}
        </div>
        <div className='mx-1 flex items-center'>
          <Switch checked={isDark} onChange={toggle} styling='github' />
        </div>
      </Navbar.Brand>
      <div className='flex items-center md:order-2'>
        <button
          className='p-1 px-3 mx-3 text-green-500 border-2 border-green-500 hidden lg:block rounded-md hover:text-white hover:bg-green-500'
          onClick={() => navigate('/event/create')}>
          {t('Create event!')}
        </button>
        {isAuthenticated ? (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={<Avatar alt='User avatar' img={me.avatar} rounded={true} />}>
            <Dropdown.Header>
              <span className='block text-sm'>{me.fullName}</span>
              <span className='block truncate text-sm font-medium'>
                {me.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item
              className='flex'
              onClick={() => navigate(`/user/${me.id}`)}>
              <BiUserCircle className='mr-2' />
              {t('Profile')}
            </Dropdown.Item>
            <Dropdown.Item
              className='flex'
              onClick={() => dispatch(settingsOn())}>
              <GoGear className='mr-2' />
              {t('Settings')}
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className='flex' onClick={() => dispatch(logOut())}>
              <BiPowerOff className='mr-2' />
              {t('Sign out')}
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <button
            className='p-1 lg:px-3 bg-green-600 rounded-md border-2 border-green-500 text-white hover:bg-green-500 animate-pulse hover:animate-none'
            onClick={() => navigate('/auth')}>
            {t('Get Started!')}
          </button>
        )}
        <Navbar.Toggle />
        {/* {isAuthenticated && <Navbar.Toggle />} */}
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          onClick={() => navigate('/home')}
          active={active === 'home'}>
          <span
            className={`flex items-center cursor-pointer p-3 px-5 rounded-md border-r hover:bg-gradient-to-l from-gray-100 hover:text-yellow-900 ${
              active === '/home' ? 'bg-gradient-to-l from-green-100' : ''
            }`}>
            <MdEventAvailable className='mr-2' />
            {t('Events')}
          </span>
        </Navbar.Link>
        <Navbar.Link
          onClick={() => navigate('/companies')}
          active={active === 'companies'}>
          <span
            className={`flex items-center cursor-pointer p-3 px-5 rounded-md border-r hover:bg-gradient-to-l from-gray-100 hover:text-yellow-900 ${
              active === '/companies' ? 'bg-gradient-to-l from-green-100' : ''
            }`}>
            <HiOutlineOfficeBuilding className='mr-2' />
            {t('Companies')}
          </span>
        </Navbar.Link>
        <Navbar.Link
          onClick={() => navigate('/calendar')}
          active={active === 'calendar'}>
          <span
            className={`flex items-center cursor-pointer p-3 px-5 rounded-md border-r hover:bg-gradient-to-l from-gray-100 hover:text-yellow-900 ${
              active === '/calendar' ? 'bg-gradient-to-l from-green-100' : ''
            }`}>
            <BsCalendarRangeFill className='mr-2' />
            {t('Calendar')}
          </span>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
