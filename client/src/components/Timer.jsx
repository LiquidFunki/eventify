/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Timer = ({ endDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());
  const { t } = useTranslation();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  function getTimeRemaining() {
    const total = Date.parse(new Date(endDate)) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  return (
    <div className='animate-pulse hover:animate-none text-green-400 lg:text-xl text-xs'>
      <span>{timeRemaining.days}{t('d')} </span>
      <span>{timeRemaining.hours}{t('h')}  </span>
      <span>{timeRemaining.minutes}{t('m')}  </span>
      <span>{timeRemaining.seconds}{t('s')} </span>
    </div>
  );
};

export default Timer;
