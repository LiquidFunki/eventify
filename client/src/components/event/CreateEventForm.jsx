import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { createEvent, getCategories } from '../../store/eventSlice';
import { tagsToSelect } from '../../utils/event.utils';
import markerIcon from '../../assets/google-maps.png';
import { getMyCompanies } from '../../store/companySlice';

const markerIconConfig = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const CreateEventForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    isLoading: eventLoading,
    success,
    categoriesLoading,
    categories,
  } = useSelector((state) => state.event);
  const { isLoading: companyLoading, myCompanies } = useSelector(
    (state) => state.company
  );
  const [form, setForm] = useState({
    title: '',
    description: '',
    banner: '',
    location: '',
    price: 0,
    startEvent: '',
    endEvent: '',
    categories: [],
    organizer: '',
    maxAttendees: 1,
  });
  const [isMarkerVisible, setMarkerVisible] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
  const [promo, setPromo] = useState('');
  const [compOptions, setCompOptions] = useState([]);
  const [map, setMap] = useState({
    lat: 50,
    lng: 30,
    address: '',
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getMyCompanies());
  }, []);

  useEffect(() => {
    if (success) {
      setForm({
        title: '',
        description: '',
        banner: '',
        location: '',
        price: 0,
        startEvent: '',
        endEvent: '',
        categories: [],
        organizer: '',
        maxAttendees: 1,
      });
    }
  }, [success]);

  const tagChange = (option) => {
    const titleArr = option.map((opt) => opt.value);
    setForm({ ...form, categories: titleArr });
  };
  const compChange = (option) => {
    setForm({ ...form, organizer: option.value });
  };

  useEffect(() => {
    setTagOptions(tagsToSelect(categories));
  }, [categoriesLoading]);
  useEffect(() => {
    setCompOptions(tagsToSelect(myCompanies));
  }, [categoriesLoading]);

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

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const promoHandler = (event) => {
    setPromo(event.target.value);
  };

  const createHandler = (event) => {
    event.preventDefault();
    dispatch(
      createEvent({
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
        {t('Promo code')}:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <input
          type='text'
          required
          onChange={promoHandler}
          value={promo}
          name='promo'
          className='w-full bg-transparent border-0 p-3 focus:border-0 focus:outline-none focus:border-green-400'
          placeholder='Enter promo code'
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
      <p>
        {t('Address')}: {map.address}
      </p>
      <label
        htmlFor='desc'
        className='font-semibold text-lg mt-2 self-start my-1'>
        {t('Organizer')}:
      </label>
      <div className='flex items-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <Select
          className='w-full basic-single p-0 m-0'
          classNamePrefix='select'
          isLoading={companyLoading}
          isClearable
          isSearchable
          name='organizer'
          options={compOptions}
          onChange={compChange}
          placeholder='Start typing to see suggestions.'
        />
      </div>
      <div className='flex mx-5 my-2'>
        <h1 className='text-start text-lg my-2'>
          {t('Don`t have a company?')}
        </h1>
        <button
          type='button'
          className='p-1 mx-4 px-3 bg-green-600 rounded-md text-white hover:bg-green-700 animate-pulse hover:animate-none'
          onClick={() => navigate('/companies/create')}>
          {t('Create company!')}
        </button>
      </div>
      <label
        htmlFor='desc'
        className='font-semibold text-lg self-start mt-2 my-1'>
        {t('Categories')}:
      </label>
      <div className='flex items-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <Select
          className='w-full basic-single p-0 m-0'
          classNamePrefix='select'
          isLoading={categoriesLoading}
          isClearable
          isSearchable
          isMulti
          name='categories'
          options={tagOptions}
          onChange={tagChange}
          placeholder='Start typing to see suggestions.'
        />
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
        {t('Create event')}
      </button>
    </form>
  );
};
