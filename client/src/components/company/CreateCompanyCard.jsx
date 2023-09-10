import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTranslation } from 'react-i18next';
import markerIcon from '../../assets/google-maps.png';
import { createCompany } from '../../store/companySlice';

const markerIconConfig = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const CreateCompanyCard = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { isLoading: companyLoading, success } = useSelector(
    (state) => state.company
  );
  const [form, setForm] = useState({
    name: '',
    description: '',
    logoUrl: '',
    location: '',
    websiteUrl: '',
  });
  const [isMarkerVisible, setMarkerVisible] = useState(false);
  const [map, setMap] = useState({
    lat: 50,
    lng: 30,
    address: '',
  });

  useEffect(() => {
    if (success) {
      setForm({
        name: '',
        description: '',
        logoUrl: '',
        location: '',
        websiteUrl: '',
      });
    }
  }, [success]);

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

  const createHandler = (event) => {
    event.preventDefault();
    dispatch(
      createCompany(form)
    );
  };
  return (
    <form
      onSubmit={createHandler}
      className='flex flex-col justify-center items-center w-full mb-4'>
      <label
        htmlFor='name'
        className='font-semibold text-lg mt-2 self-start my-1'>
        {t('Name')}:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <input
          type='text'
          required
          onChange={changeHandler}
          value={form.title}
          name='name'
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
          name='logoUrl'
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
      <label
        htmlFor='name'
        className='font-semibold text-lg mt-2 self-start my-1'>
        {t('Website url')}:
      </label>
      <div className='flex items-center justify-center w-full border border-green-500 rounded-md hover:shadow-md hover:shadow-green-400'>
        <input
          type='text'
          required
          onChange={changeHandler}
          value={form.websiteUrl}
          name='websiteUrl'
          className='w-full bg-transparent border-0 p-3 focus:border-0 focus:outline-none focus:border-green-400'
          placeholder='Enter link to banner'
        />
      </div>
      <button
        type='submit'
        className='mt-2 mb-2 w-full text-white rounded-md bg-green-500 p-3 hover:bg-green-600 hover:shadow-md hover:shadow-green-400'
        disabled={companyLoading}>
        {t('Create company')}
      </button>
    </form>
  );
};
