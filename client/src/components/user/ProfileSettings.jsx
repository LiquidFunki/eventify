import { Avatar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { BsFillPersonFill, BsImage } from 'react-icons/bs';
import { HiAtSymbol } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';

import { useMessage } from '../../hooks/message.hook';
import { editProfile } from '../../store/authSlice';

export const ProfileSettings = () => {
  const message = useMessage();
  const dispatch = useDispatch();
  const { me, isLoading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    login: me.login,
    email: me.email,
    fullName: me.fullName,
    avatar: me.avatar,
  });

  useEffect(() => {
    setForm({
      login: me.login,
      email: me.email,
      fullName: me.fullName,
      avatar: me.avatar,
    });
  }, [me]);

  const editHandler = (e) => {
    e.preventDefault();
    dispatch(editProfile(form));
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const imgErrHandler = ({ currentTarget }) => {
    currentTarget.onerror = null;
    message('invalid link to image for avatar', 'error');
    setForm({ ...form, avatar: me.avatar });
  };
  return (
    <form
      onSubmit={editHandler}
      className='flex flex-col justify-center items-center w-full'>
      <div className='flex flex-row justify-center items-center'>
        <Avatar
          alt='User avatar'
          img={form.avatar}
          onError={imgErrHandler}
          rounded={true}
          size='xl'
        />
      </div>
      <label htmlFor='email' className='self-start py-3'>
        Avatar:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <BsImage color='green' className='mx-3' />
        <input
          type='text'
          required
          onChange={changeHandler}
          value={form.avatar}
          name='avatar'
          className='w-full bg-transparent border-0 p-3 focus:border-0 focus:outline-none focus:border-green-400'
          placeholder='Paste link to any image'
        />
      </div>
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
      <label htmlFor='login' className='self-start py-2'>
        Full name:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <BsFillPersonFill color='green' className='mx-3' />
        <input
          required
          type='text'
          onChange={changeHandler}
          value={form.fullName}
          name='login'
          className='w-full bg-transparent border-0 p-3 focus:border-0 focus:outline-none focus:border-green-400'
          placeholder='Full name'
        />
      </div>
      <button
        type='submit'
        className='my-4  w-full text-white rounded-md bg-green-500 p-3 hover:bg-green-600 hover:shadow-md hover:shadow-green-400'
        disabled={isLoading}>
        Save changes
      </button>
    </form>
  );
};
