import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import companyReducer from './companySlice';
import eventReducer from './eventSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    auth: authReducer,
    company: companyReducer,
    event: eventReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
