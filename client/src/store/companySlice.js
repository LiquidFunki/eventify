import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import api from '../http';
import { API_URL } from '../utils/constants';
import { errorHandler } from '../utils/errorHandler';

export const getAllCompanies = createAsyncThunk(
  'company/getAllCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/company/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMyCompanies = createAsyncThunk(
  'company/getMyCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/company/my`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCompany = createAsyncThunk(
  'post/getCompany',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/company/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCompany = createAsyncThunk(
  'company/createCompany',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/company`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/company/${_id}`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async ({ id }, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/company/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [],
    myCompanies: [],
    company: {},
    error: null,
    isLoading: false,
    success: true,
  },
  reducers: {
    setSuccessFalse(state) {
      state.success = false;
    },
  },
  extraReducers: {
    [getAllCompanies.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyCompanies.pending]: (state) => {
      state.isLoading = true;
    },
    [getCompany.pending]: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    [createCompany.pending]: (state) => {
      state.isLoading = true;
      state.success = false;
    },
    [getAllCompanies.fulfilled]: (state, action) => {
      state.companies = action.payload;
      state.isLoading = false;
    },
    [getMyCompanies.fulfilled]: (state, action) => {
      state.myCompanies = action.payload;
      state.isLoading = false;
    },
    [getCompany.fulfilled]: (state, action) => {
      state.company = action.payload;
      state.isLoading = false;
    },
    [createCompany.fulfilled]: (state) => {
      toast.success('Company has been successfully created!');
      // state.companies = [...state.Companies, action.payload];
      state.isLoading = false;
      state.success = true;
    },
    [deleteCompany.fulfilled]: (state, action) => {
      const id = action.payload;
      state.companies = state.companies.filter((item) => item._id !== id);
      state.isLoading = false;
    },
    [updateCompany.fulfilled]: (state, action) => {
      toast.success('Company has been successfully updated!');
      state.company = action.payload;
      state.isLoading = false;
      state.success = true;
    },
    [getAllCompanies.rejected]: errorHandler,
    [getMyCompanies.rejected]: errorHandler,
    [getCompany.rejected]: errorHandler,
    [createCompany.rejected]: errorHandler,
    [updateCompany.rejected]: errorHandler,
  },
});

export const { setSuccessFalse } = companySlice.actions;

export default companySlice.reducer;
