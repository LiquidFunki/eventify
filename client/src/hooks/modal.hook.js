/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateEventForm } from '../components/event/CreateEventForm';
import { EditEventForm } from '../components/event/EditEventForm';
import { ModalWin } from '../components/ModalWin';
import { ProfileSettings } from '../components/user/ProfileSettings';
import {
  createEventOff,
  paymentOff,
  editEventOff,
  settingsOff,
} from '../store/modalSlice';
import PaymentModal from '../components/PaymentModal';

export const useModal = () => {
  const dispatch = useDispatch();
  const {
    payment,
    createEvent,
    editEvent,
    settings,
  } = useSelector((state) => state.modal);

  return (
    <div>
      <ModalWin
        show={settings}
        header={'Profile settings'}
        onHide={() => dispatch(settingsOff())}>
        <ProfileSettings />
      </ModalWin>
      <ModalWin
        show={createEvent}
        header={'Event creation'}
        onHide={() => dispatch(createEventOff())}>
        <CreateEventForm />
      </ModalWin>
      <ModalWin
        show={payment}
        header={'Payment'}
        onHide={() => dispatch(paymentOff())}>
        <PaymentModal />
      </ModalWin>
      <ModalWin
        show={editEvent}
        header={'Event edition'}
        onHide={() => dispatch(editEventOff())}>
        <EditEventForm />
      </ModalWin>
    </div>
  );
};
