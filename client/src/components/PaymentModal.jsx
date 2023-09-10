/* eslint-disable max-len */
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import api from '../http';
import { API_URL } from '../utils/constants';
import { subscribeEvent } from '../store/eventSlice';
import { formatDate } from '../utils/date.utils';

const PaymentModal = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { event: currEvent } = useSelector((state) => state.event);
  const { t } = useTranslation();
  const [promo, setPromo] = useState('');

  const promoHandler = (event) => {
    setPromo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const cardElement = elements.getElement(CardElement);
    const response = await api.post(`${API_URL}/event/create-payment-intent`, {
      amount: currEvent.price,
      currency: 'usd',
    });

    if (response.status === 200) {
      const { clientSecret } = await response.data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {},
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        console.log(result);
        dispatch(
          subscribeEvent({
            id: currEvent._id,
            paymentIntentId: result.paymentIntent.id,
            price: promo === 'sale123' || promo === 'promo' || promo === '123' || promo === 'sale' ? currEvent.price - (currEvent.price * 0.05) : currEvent.price,
            title: currEvent.title,
            startEvent: formatDate(currEvent.startEvent),
            endEvent: formatDate(currEvent.endEvent),
          })
        ); //
        console.log('Payment success:', result.paymentIntent);
      }
    } else {
      setError('Payment failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
      {/* Отображение CardElement */}
      <p className='text-lg font-semibold my-1'>
        {t('Ticket for')}: {currEvent.title}
      </p>
      <p className='text-lg font-semibold self-start my-1'>
        {t('Price')}: {promo === 'sale123' ? currEvent.price - (currEvent.price * 0.05) : currEvent.price}$
      </p>
      <p className='text-lg font-semibold my-1 self-start'>
        {t('Enter your card details')}:
      </p>
      <CardElement className='border p-3 rounded-md text-lg w-full' />
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
      <button
        type='submit'
        className='border p-1 my-3 hover:bg-green-200 rounded-md text-lg w-full '>
        {t('Pay')}
      </button>
      {error && (
        <p className='text-lg text-red-400 font-semibold my-1 self-start'>
          {error}
        </p>
      )}
    </form>
  );
};

export default PaymentModal;
