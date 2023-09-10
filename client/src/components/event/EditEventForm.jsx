import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';

import { useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, getEvent, updateEvent } from '../../store/eventSlice';
import markerIcon from '../../assets/google-maps.png';

const markerIconConfig = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const EditEventForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();

  const { isLoading: eventLoading, event } = useSelector(
    (state) => state.event
  );
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    banner: '',
    location: '',
    price: 0,
    startEvent: '',
    endEvent: '',
    maxAttendees: 1,
  });
  const [isMarkerVisible, setMarkerVisible] = useState(false);
  const [map, setMap] = useState({
    lat: 50,
    lng: 30,
    address: '',
  });

  useEffect(() => {
    setForm({
      title: event.title,
      description: event.description,
      banner: event.banner,
      location: event.location,
      price: event.price,
      startEvent: event.startEvent,
      endEvent: event.endEvent,
      maxAttendees: event.maxAttendees,
    });
  }, [event]);

  useEffect(() => {
    if (id) {
      dispatch(getEvent({ id }));
    }
  }, [id]);

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        const temp = {
          latitude: lat,
          longitude: lng,
          address: data.display_name,
        };
        setMap({ lat, lng, address: data.display_name });
        setForm({ ...form, location: JSON.stringify(temp) });
      })
      .catch((error) => console.error(error));
    setMarkerVisible(true);
  };

  const MapEventsHandler = () => {
    useMapEvents({
      click: handleClick,
    });
    return null;
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEvent({
        _id: event._id,
        ...form,
        startEvent: new Date(form.startEvent).toISOString(),
        endEvent: new Date(
          form.endEvent || new Date(form.startEvent)
        ).toISOString(),
      })
    );
  };
  return (
    <form
      onSubmit={createHandler}
      className='flex flex-col justify-center items-center w-full mb-4'>
      <label
        htmlFor='name'
        className='font-semibold text-lg mt-2 self-start my-1'>
        {t('Title')}:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <input
          type='text'
          required
          onChange={changeHandler}
          value={form.title}
          name='title'
          className='w-full bg-transparent border-0 p-3 focus:border-0 focus:outline-none focus:border-green-400'
          placeholder='title'
        />
      </div>
      <label
        htmlFor='desc'
        className='font-semibold text-lg mt-2 self-start my-1'>
        {t('Description')}:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <textarea
          type='text'
          required
          onChange={changeHandler}
          value={form.description}
          name='description'
          className='w-full bg-transparent border-0 p-3 focus:border-0 focus:outline-none focus:border-green-400'
          placeholder='Description'
        />
      </div>
      <label
        htmlFor='name'
        className='font-semibold text-lg mt-2 self-start my-1'>
        {t('Banner')}:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <input
          type='text'
          required
          onChange={changeHandler}
          value={form.banner}
          name='banner'
          className='w-full bg-transparent border-0 p-3 focus:border-0 focus:outline-none focus:border-green-400'
          placeholder='Enter link to banner'
        />
      </div>
      <label
        htmlFor='name'
        className='font-semibold text-lg mt-2 self-start my-1'>
        {t('Location')}:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <MapContainer
          center={[map.lat, map.lng]}
          zoom={6}
          style={{ height: '320px', width: '100%' }}
          className='cursor-pointer'>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          {isMarkerVisible && (
            <Marker position={[map.lat, map.lng]} icon={markerIconConfig} />
          )}
          <MapEventsHandler />
        </MapContainer>
      </div>
      <p>{t('Address')}: {map.address}</p>
      <div className='flex mx-5 my-2'>
        <h1 className='text-start text-lg my-2'>
          {t('Don`t have a company?')}
        </h1>
        <button
          className='p-1 mx-4 px-3 bg-green-600 rounded-md text-white hover:bg-green-700 animate-pulse hover:animate-none'
          onClick={() => navigate('/companies/create')}>
          {t('Create company!')}
        </button>
      </div>
      <div className='flex items-center my-3 self-start w-full'>
        <label
          htmlFor='start'
          className='font-semibold text-lg mr-3 w-1/4 lg:w-1/6'>
          {t('Start at')}:
        </label>
        <input
          required
          type='datetime-local'
          name='startEvent'
          value={form.startEvent}
          className='w-1/2 ml-1 mr-3 my-2 rounded-sm'
          onChange={changeHandler}
        />
      </div>
      <div className='flex items-center self-start w-full'>
        <label
          htmlFor='start'
          className='font-semibold text-lg mr-3 w-1/4 lg:w-1/6'>
          {t('End at')}:
        </label>
        <input
          required={!form.allDay}
          type='datetime-local'
          name='endEvent'
          value={form.allDay ? '' : form.endEvent}
          className='w-1/2 ml-1 mr-3 my-2 rounded-sm'
          onChange={changeHandler}
        />
      </div>
      <div className='flex items-center self-start w-full'>
        <label
          htmlFor='start'
          className='font-semibold text-lg mr-3 w-1/4 lg:w-1/6'>
          {t('Price')}:
        </label>
        <input
          type='number'
          name='price'
          value={form.price}
          className='w-1/2 ml-1 mr-3 my-2 rounded-sm'
          onChange={changeHandler}
        />
      </div>
      <div className='flex items-center self-start w-full'>
        <label
          htmlFor='start'
          className='font-semibold text-lg mr-3 w-1/4 lg:w-1/6'>
          {t('Max attendees')}:
        </label>
        <input
          type='number'
          name='maxAttendees'
          value={form.maxAttendees}
          className='w-1/2 ml-1 mr-3 my-2 rounded-sm'
          onChange={changeHandler}
        />
      </div>
      <button
        type='submit'
        className='mt-2 mb-2 w-full text-white rounded-md bg-green-500 p-3 hover:bg-green-600 hover:shadow-md hover:shadow-green-400'
        disabled={eventLoading}>
        {t('Confirm editions')}
      </button>
      <button
        type='button'
        onClick={() => {
          dispatch(deleteEvent({ id: event._id }));
          navigate('/home');
        }}
        className='mt-2 mb-2 w-full text-white rounded-md bg-red-500 p-3 hover:bg-red-600 hover:shadow-md hover:shadow-green-400'
        disabled={eventLoading}>
        {t('Delete event')}
      </button>
    </form>
  );
};
