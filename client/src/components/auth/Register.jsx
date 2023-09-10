import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiAtSymbol } from 'react-icons/hi';
import { MdLabel } from 'react-icons/md';

import { useTranslation } from 'react-i18next';
import { PswdInput } from './PwsdInput';
import { signUp } from '../../store/authSlice';

export const Register = ({ setFormType }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
    repeatedPassword: '',
    fullName: '',
  });
  const { isLoading } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const signUpHandler = (e) => {
    e.preventDefault();
    dispatch(signUp(form));
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <form
      onSubmit={signUpHandler}
      className='flex flex-col justify-center items-center w-full'>
      <h1 className='text-2xl'>{t('Sign Up1')}</h1>
      <label htmlFor='email' className='self-start py-3'>
        Email:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <HiAtSymbol color='green' className='mx-3' />
        <input
          type='email'
          required
          onChange={changeHandler}
          value={form.email}
          name='email'
          className='w-full bg-transparent border-0 p-3 focus:border-0 focus:outline-none focus:border-green-400'
          placeholder='Email'
        />
      </div>
      <label htmlFor='FullName' className='self-start py-2'>
        {t('Full name')}:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <MdLabel color='green' className='mx-3' />
        <input
          required
          type='text'
          onChange={changeHandler}
          value={form.fullName}
          name='fullName'
          className='w-full bg-transparent border-0 p-3 focus:border-0 focus:outline-none focus:border-green-400'
          placeholder={`${t('Full name')}`}
        />
      </div>
      <label htmlFor='password' className='self-start py-2'>
        {t('Password')}:
      </label>
      <PswdInput changeHandler={changeHandler} passwordInput={form.password} />
      <label htmlFor='password' className='self-start py-2'>
        {t('Repeat password')}:
      </label>
      <PswdInput
        changeHandler={changeHandler}
        passwordInput={form.repeatedPassword}
        isRepeated
      />
      <button
        type='submit'
        className='my-4  w-full text-white rounded-md bg-green-500 p-3 hover:bg-green-600 hover:shadow-md hover:shadow-green-400'
        disabled={isLoading}>
        {t('Sign Up')}
      </button>
      <p>
        {t('Already have an account?')}
        <span
          className='text-green-500 cursor-pointer'
          onClick={() => setFormType('login')}>
          {'  '}
          {t('Sign In')}
        </span>
      </p>
    </form>
  );
};
