import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { resetPassword } from '../../store/authSlice';
import { PswdInput } from './PwsdInput';

export const PswdResetConf = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { isLoading, success } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const [form, setForm] = useState({
    password: '',
    repeatedPassword: '',
  });

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const resetHandler = (event) => {
    event.preventDefault();
    dispatch(resetPassword({ token, ...form }));
  };
  return (
    <form
      onSubmit={resetHandler}
      className='flex flex-column items-center w-1/2 mb-4'>
      <h1>{t('Reset Password')}</h1>
      <label htmlFor='password' className='self-start'>
        {t('Password')}:
      </label>
      <PswdInput changeHandler={changeHandler} passwordInput={form.password} />
      <label htmlFor='password' className='self-start'>
        {t('Repeat password')}:
      </label>
      <PswdInput
        changeHandler={changeHandler}
        passwordInput={form.repeatedPassword}
        isRepeated
      />
      <button
        type='submit'
        className='mt-2 mb-2 waves-effect w-full bg-lime-600 hover:bg-lime-400'
        disabled={isLoading}>
        {t('Reset password')}
      </button>
    </form>
  );
};
