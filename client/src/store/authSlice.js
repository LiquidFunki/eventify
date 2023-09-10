import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';
import api from '../http';
import { API_URL } from '../utils/constants';
import { errorHandler } from '../utils/errorHandler';

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload, { rejectWithValue }) => {
    try {
      const location = await axios.get('https://ipapi.co/json/');
      const response = await api.post(`${API_URL}/auth/register`, {
        ...payload,
        country: location.data.country_code,
        language: location.data.languages.split(',')[0],
      });
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/auth/login`, payload);
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleAuth = createAsyncThunk(
  'auth/googleAuth',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/auth/google`, payload);
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProfile = createAsyncThunk(
  'auth/editProfile',
  async ({ fullName, email, login, avatar }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/users`, {
        fullName,
        email,
        login,
        avatar,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password, repeatedPassword }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}/auth/password-reset/${token}`,
        { password, repeatedPassword }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPswd = createAsyncThunk(
  'auth/resetPswd',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}/auth/password-reset`,
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/auth/logout`);
      localStorage.removeItem('token');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    me: {
      id: 0,
      email: 'email@example.com',
      login: 'Login',
      fullName: 'Full Name',
      avatar:
        'https://d1fdloi71mui9q.cloudfront.net/o7cT7VKiQ1KMvXKf5j1Z_4WFdLoIRs3rUMwlw',
    },
    isAuthenticated: false,
    isLoading: false,
    success: false,
    buf: true,
  },
  reducers: {
    buffOff(state) {
      state.buf = false;
    },
    tokenAuth(state) {
      const decodedToken = decode(localStorage.getItem('token'));
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        state.me = {};
        state.isAuthenticated = false;
        state.buf = false;
      } else {
        state.me = decodedToken;
        state.isAuthenticated = true;
        state.buf = false;
      }
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [signIn.googleAuth]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [signUp.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [resetPswd.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [checkAuth.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [editProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.me = { ...action.payload, accessToken: undefined };
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [googleAuth.fulfilled]: (state, action) => {
      state.me = { ...action.payload, accessToken: undefined };
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [signUp.fulfilled]: (state, action) => {
      state.me = { ...action.payload, accessToken: undefined };
      state.isAuthenticated = true;
      toast.success('Registration was successful');
      state.success = true;
      state.isLoading = false;
    },
    [editProfile.fulfilled]: (state, action) => {
      toast.success('Profile has been successfully updated');
      state.me = action.payload;
      state.isLoading = false;
    },
    [resetPswd.fulfilled]: (state) => {
      toast.success('Now you should check your email');
      state.success = true;
      state.isLoading = false;
    },
    [resetPassword.fulfilled]: (state) => {
      toast.success('Password has been successfully reset');
      state.success = true;
      state.isLoading = false;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.me = { ...action.payload, accessToken: undefined };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.buf = false;
    },
    [logOut.fulfilled]: (state) => {
      state.me = {};
      state.isAuthenticated = false;
    },
    [signIn.rejected]: errorHandler,
    [signIn.googleAuth]: errorHandler,
    [signUp.rejected]: errorHandler,
    [editProfile.rejected]: errorHandler,
    [logOut.rejected]: errorHandler,
    [resetPassword.rejected]: errorHandler,
    [resetPswd.rejected]: errorHandler,
    [checkAuth.rejected]: (state, action) => {
      state.isLoading = false;
      state.buf = false;
      console.log('req error: ', action.payload);
    },
  },
});
export const { tokenAuth, buffOff } = authSlice.actions;
export default authSlice.reducer;
