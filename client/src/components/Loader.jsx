import { Spinner } from 'flowbite-react';
import React from 'react';

export const Loader = () => (
  <div className='flex w-full h-96 justify-center items-center'>
    <Spinner color='success' size='xl' aria-label='Success spinner example' />
  </div>
);
