/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Timer from '../components/Timer';
import { Loader } from '../components/Loader';
import {
  createComment,
  getAllComments,
  getAllEvents,
  getEvent,
  setPaymentSuccessFalse,
  setSuccessFalse,
  subscribeEvent,
} from '../store/eventSlice';
import { Map } from '../components/Map';
import { formatDate } from '../utils/date.utils';
import { CommentCard } from '../components/event/CommentCard';
import { EventCard } from '../components/event/EventCard';
import { paymentOff, paymentOn } from '../store/modalSlice';

export const EventPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [commentInp, setCommentInp] = useState('');
  const [simEvent, setSimEvent] = useState([]);
  const { event, comments, isLoading, success,
    filteredEvents, events, paymentSuccess } = useSelector((state) => state.event);
  const { me } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllEvents());
    if (id) {
      dispatch(getEvent({ id }));
      dispatch(getAllComments({ id }));
    }
    dispatch(setSuccessFalse());
  }, [id]);

  useEffect(() => {
    if (paymentSuccess) {
      dispatch(getEvent({ id }));
      dispatch(paymentOff());
      dispatch(setPaymentSuccessFalse());
    }
  }, [paymentSuccess]);

  useEffect(() => {
    if (filteredEvents.length) {
      const temp = [...filteredEvents];
      setSimEvent(temp.filter((ev) => event._id !== ev._id).slice(0, 2));
    } else {
      const temp = [...events];
      setSimEvent(temp.filter((ev) => event._id !== ev._id).slice(0, 2));
    }
  }, [event, events, filteredEvents]);

  const handleBuyTicket = () => {
    if (event.price) {
      dispatch(paymentOn());
    } else {
      dispatch(
        subscribeEvent({
          id: event._id,
          paymentIntentId: event._id,
          price: event.price,
          title: event.title,
          startEvent: formatDate(event.startEvent),
          endEvent: formatDate(event.endEvent),
        })
      );
    }
  };
  const createCommentHandler = () => {
    dispatch(createComment({ id, body: commentInp }));
  };
  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (isLoading || success) {
    return <Loader />;
  }
  return (
    <div className='container mx-auto '>
      <div className='flex flex-col lg:flex-row my-4 lg:justify-between '>
        <div className='flex lg:w-3/12 w-full justify-center'>
          <img
            src={event.banner}
            alt={event.title}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = 'https://www.seekpng.com/png/detail/125-1257164_search-event-fiesta-icon-png.png';
            }}
            className='w-11/12 h-auto lg:mr-4 object-cover rounded-md shadow-xl shadow-green-100'
          />
        </div>
        <div className='flex bg-white lg:w-6/12 w-full'>
          <div className='flex flex-col flex-grow p-4'>
            <h2 className='lg:text-5xl text-2xl font-bold lg:text-left'>
              {event.title}
            </h2>
            <div className='flex w-full lg:h-1/3 my-3 items-center'>
              <div className='flex flex-col items-center justify-center border-r border-gray-300 w-1/2'>
                <h3 className='lg:text-3xl text-xl font-bold'>
                  {formatDate(event.startEvent)}
                </h3>
                {new Date() < new Date(event.startEvent) ? (
                  <Timer endDate={event.startEvent} />
                ) : (
                  <p className='text-red-500 text-xl border border-red-500 rounded-md px-1'>
                    {t('Expired')}
                  </p>
                )}
              </div>
              <div
                onClick={() => navigate(`/company/${event.organizer._id}`)}
                className='flex mx-3 w-1/2 cursor-pointer items-center justify-center hover:shadow-md h-full rounded-md overflow-hidden'>
                <img
                  className='w-5/12 max-w-xs h-full object-cover rounded-md '
                  src={event.organizer.logoUrl}
                  alt={event.organizer.name}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = 'https://www.seekpng.com/png/detail/125-1257164_search-event-fiesta-icon-png.png';
                  }}
                />
                <p className='text-gray-700 px-3 font-semibold text-lg'>
                  {t('by')} {event.organizer.name}
                </p>
              </div>
            </div>
            <Map location={JSON.parse(event.location)} />
          </div>
        </div>
        {/* Render buy ticket/sign to event button */}
        <div className='border rounded px-4 py-2 flex flex-col items-center self-center lg:w-3/12 w-full'>
          {event.organizer && event.organizer.owner === me.id && (
            <div className='w-full py-5 border-b text-xl'>
              <button
                className='border-2 w-1/2 border-gray-500 text-gray-500 hover:text-black hover:border-black px-2 py-1 rounded-md'
                onClick={() => navigate(`/event/edit/${event._id}`)}>
                {t('Edit')}
              </button>
            </div>
          )}
          <div className='w-full py-5 border-b text-xl'>
            {t('Price')}: <b>{event.price}₴</b>
          </div>
          <div className='w-full border-b py-5'>
            {new Date() < new Date(event.startEvent) ? (
              event.attendees.some((att) => att._id === me.id) ? (
                <p className='text-green-500 text-xl border border-green-500 rounded-md p-2'>
                  {t('Subscribed')}
                </p>
              ) : (
                <button
                  className='bg-green-500 w-1/2 hover:bg-green-600 text-white px-4 py-2 rounded'
                  onClick={handleBuyTicket}>
                  {event.price ? t('Buy Ticket') : t('Sign to Event')}
                </button>
              )
            ) : (
              <p className='text-red-500 text-xl border border-red-500 rounded-md p-2'>
                {t('Expired')}
              </p>
            )}
          </div>
          <div className='flex-grow w-full py-5'>
            {/* Render member count */}
            <div className='flex justify-center'>
              <div className='relative'>
                {/* Render dropdown list with arrow */}
                <button
                  className='bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded'
                  onClick={handleOpenDropdown}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='h-5 w-5 inline-block align-middle'>
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.707a1 1 0 0 1 1.414 0L10 10.586l3.293-2.879a1 1 0 1 1 1.414 1.414l-4 3.5a1 1 0 0 1-1.414 0l-4-3.5a1 1 0 0 1 0-1.414z'
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <ul className='absolute left-0 mt-2 border bg-white p-1 rounded max-h-40 overflow-y-auto overflow-x-auto'>
                    {event.attendees.map((att, index) => (
                      <li className='w-52 border-b-2' key={index}>
                        <div
                          onClick={() => navigate(`/user/${att._id}`)}
                          className='flex mx-1 w-full cursor-pointer items-center justify-center hover:shadow-md h-full rounded-md overflow-hidden'>
                          <img
                            className='w-5/12 max-w-xs h-full object-cover rounded-md '
                            src={att.avatar}
                            alt={att.fullName}
                          />
                          <p className='text-gray-700 px-3 font-semibold text-lg'>
                            {att.fullName}
                          </p>
                        </div>
                      </li>
                    ))}
                    {/* Add more list items as needed */}
                  </ul>
                )}
              </div>
              <div className='flex items-center ml-2'>
                {t('Participants')}: {event.attendees.length} /{' '}
                {event.maxAttendees}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl font-bold text-start lg:text-3xl'>
          {t('Description')}
        </h2>
        <p className='text-start mt-1'>{event.description}</p>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl font-bold text-start lg:text-3xl'>
          {t('Comments')}
        </h2>
        <div className='overflow-y-auto max-h-80'>
          {comments.length ? (
            comments.map((comment, index) => (
              <CommentCard key={index} comment={comment} />
            ))
          ) : (
            <div className='flex flex-col w-full lg:mx-5 my-6'>
              <h1 className='text-2xl my-6'>{t('Oops! Nothing found...')}</h1>
            </div>
          )}
        </div>
        <div className='w-full border my-5 border-green-500 rounded-md hover:shadow-md hover:shadow-green-400 mb-3 lg:mb-0'>
          <div className='flex items-center bg-white rounded-md'>
            <textarea
              type='text'
              onChange={(e) => setCommentInp(e.target.value)}
              value={commentInp}
              name='comment'
              className='w-full bg-transparent border-0 p-3 focus:outline-none focus:border-0'
              placeholder={`${t('Comment')}...`}
            />
            <button
              name='post'
              className='flex items-center justify-center text-lg h-full p-5 cursor-pointer border-l hover:bg-green-50'
              onClick={createCommentHandler}>
              {t('Send')}
            </button>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl font-bold text-start lg:text-3xl'>
          {t('Similar events')}
        </h2>
        <div className='flex flex-col justify-between lg:flex-row w-full lg:mx-5 my-6'>
          {simEvent.map((ev) => (
            <div key={ev._id} onClick={() => navigate(`/event/${ev._id}`)}>
              <EventCard event={ev} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
