import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiAtSymbol } from 'react-icons/hi';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { useTranslation } from 'react-i18next';
import { useMessage } from '../../hooks/message.hook';
import { signIn, googleAuth } from '../../store/authSlice';
import { PswdInput } from './PwsdInput';

export const Login = ({ setFormType }) => {
  const dispatch = useDispatch();
  const message = useMessage();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { isLoading } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const responseGoogle = async (response) => {
    dispatch(googleAuth({ token: response.credential }));
  };

  const signInHandler = (e) => {
    e.preventDefault();
    if (!form.email.length || !form.password.length) {
      message('All fields must be filled', 'error');
    } else {
      dispatch(signIn(form));
    }
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <form
      onSubmit={signInHandler}
      className='flex flex-col justify-center items-center w-full'>
      <h1 className='text-4xl'>{t('Sign In1')}</h1>
      <label htmlFor='login' className='self-start py-2'>
        Email:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <HiAtSymbol color='green' className='mx-3' />
        <input
          required
          type='text'
          onChange={changeHandler}
          value={form.email}
          name='email'
          className='w-full bg-transparent border-0 p-3 focus:border-0 focus:outline-none focus:border-green-400'
          placeholder='email'
        />
      </div>
      <label htmlFor='password' className='self-start py-2'>
        {t('Password')}:
      </label>
      <PswdInput changeHandler={changeHandler} passwordInput={form.password} />
      <span className='mt-3'>
        {t('Forgot your password?')}
        <span
          className='text-green-500 cursor-pointer'
          onClick={() => setFormType('pswdReset')}>
          {'  '}
          {t('Reset')}
        </span>
      </span>
      <button
        type='submit'
        className='mt-2 mb-2 w-full text-white rounded-md bg-green-500 p-3 hover:bg-green-600 hover:shadow-md hover:shadow-green-400'
        disabled={isLoading}>
        {t('Sign In')}
      </button>
      <p>
        {t('Don’t have an account?')}
        <span
          className='text-green-500 cursor-pointer'
          onClick={() => setFormType('register')}>
          {'  '}
          {t('Sign Up')}
        </span>
      </p>
      <div className='w-96 mt-2 pt-4 flex justify-center border-t-2'>
      <GoogleOAuthProvider
        clientId={
          '573519305413-kgjtucft3i0jscu6pvkiq3tce7l2876c.apps.googleusercontent.com'
        }>
          <GoogleLogin
            // shape='pill'
            buttonText='Login'
            width='300px'
            onSuccess={responseGoogle}
            onFailure={() => message('something went wrong', 'error')}
            cookiePolicy={'single_host_origin'}
          />
      </GoogleOAuthProvider>
      </div>
    </form>
  );
};
