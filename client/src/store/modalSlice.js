import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    payment: false,
    editCalendar: false,
    createEvent: false,
    editEvent: false,
    infoEvent: false,
    infoCalendar: false,
    settings: false,
  },
  reducers: {
    settingsOn(state) {
      state.settings = true;
    },
    settingsOff(state) {
      state.settings = false;
    },
    paymentOn(state) {
      state.payment = true;
    },
    paymentOff(state) {
      state.payment = false;
    },
    editCalendarOn(state) {
      state.editCalendar = true;
    },
    editCalendarOff(state) {
      state.editCalendar = false;
    },
    createEventOn(state) {
      state.createEvent = true;
    },
    createEventOff(state) {
      state.createEvent = false;
    },
    editEventOn(state) {
      state.editEvent = true;
    },
    editEventOff(state) {
      state.editEvent = false;
    },
    infoEventOn(state) {
      state.infoEvent = true;
    },
    infoEventOff(state) {
      state.infoEvent = false;
    },
    infoCalendarOn(state) {
      state.infoCalendar = true;
    },
    infoCalendarOff(state) {
      state.infoCalendar = false;
    },
  },
});

export const {
  paymentOn,
  paymentOff,
  createEventOn,
  createEventOff,
  editCalendarOn,
  editCalendarOff,
  editEventOn,
  editEventOff,
  infoEventOn,
  infoEventOff,
  infoCalendarOn,
  infoCalendarOff,
  settingsOn,
  settingsOff,
} = modalSlice.actions;

export default modalSlice.reducer;
