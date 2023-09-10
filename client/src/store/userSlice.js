import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../http';
import { API_URL } from '../utils/constants';
import { errorHandler } from '../utils/errorHandler';

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [getUser.rejected]: errorHandler,
    [getAllUsers.rejected]: errorHandler,
  },
});

export default userSlice.reducer;
