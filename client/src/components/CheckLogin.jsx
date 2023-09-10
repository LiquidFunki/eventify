import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth, tokenAuth, buffOff } from '../store/authSlice';
import { Loader } from './Loader';

export const CheckLogin = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(tokenAuth());
      dispatch(checkAuth());
    }
    dispatch(buffOff());
  }, []);

  if (!isLoading) {
    return <Outlet />;
  }
  return (
    <div className='flex mt-10'>
      <Loader />
    </div>
  );
};
