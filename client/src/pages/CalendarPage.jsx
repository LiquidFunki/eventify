import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyEvents } from '../store/eventSlice';
import { BigCalendar } from '../components/calendar/BigCalendar';
import { Loader } from '../components/Loader';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { infoCalendarOn } from '../store/modalSlice';

export const CalendarPage = () => {
  const dispatch = useDispatch();
  const { events, isLoading: eventLoading } = useSelector(
    (state) => state.event
  );

  useEffect(() => {
    dispatch(getMyEvents());
  }, []);

  if (eventLoading) {
    return <Loader />;
  }

  return (
    <div className='container w-full flex flex-col mx-auto p-3'>
      <div className='w-full flex justify-between items-center mb-2 p-3'>
        <h1 className='text-2xl'>
          <b>Your</b> calendar
        </h1>
        <button
        onClick={() => {
          dispatch(infoCalendarOn());
        }}
        className='p-3 border shadow-md hover:bg-gray-200 hover:shadow-green-200 border-green-300 rounded-md'>
          More info
        </button>
      </div>
      <div
        className='w-full flex p-3 border shadow-md shadow-green-200 border-green-300 rounded-md'
        style={{ height: '80vh' }}>
        <BigCalendar events={events} />
      </div>
    </div>
  );
};
