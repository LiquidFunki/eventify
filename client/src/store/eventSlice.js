import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import api from '../http';
import { API_URL } from '../utils/constants';
import {
  DEFAULT_FILTERS,
  countTotalPages,
  filterEventsUtil,
  getCurrentEvents,
} from '../utils/filters.utils';
import { errorHandler } from '../utils/errorHandler';

export const getTodayEvents = createAsyncThunk(
  'event/getTodayEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/today`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEvent = createAsyncThunk(
  'event/getEvent',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllEvents = createAsyncThunk(
  'event/getAllEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCompanyEvents = createAsyncThunk(
  'event/getCompanyEvents',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/company/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllComments = createAsyncThunk(
  'event/getAllComments',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/comment/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategories = createAsyncThunk(
  'event/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMyEvents = createAsyncThunk(
  'event/getMyEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/my`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (body, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/event`, body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createComment = createAsyncThunk(
  'event/createComment',
  async ({ id, body }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/comment/${id}`, {
        body,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const subscribeEvent = createAsyncThunk(
  'event/subscribeEvent',
  async ({ id, paymentIntentId, price, title, startEvent, endEvent }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/event/subscribe/${id}`, {
        paymentIntentId,
        price,
        title,
        startEvent,
        endEvent
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEvent = createAsyncThunk(
  'event/updateEvent',
  async (
    {
      _id,
      title,
      description,
      banner,
      location,
      price,
      startEvent,
      endEvent,
      maxAttendees,
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`${API_URL}/event/${_id}`, {
        title,
        description,
        banner,
        location,
        price,
        startEvent,
        endEvent,
        maxAttendees,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'event/deleteEvent',
  async ({ id }, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/event/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptEventInvite = createAsyncThunk(
  'event/acceptEventInvite',
  async ({ key }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/event/acceptInvite/${key}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    events: [],
    filteredEvents: [],
    companyEvents: [],
    categories: [],
    categoriesLoading: false,
    comments: [],
    todayEvents: [],
    event: {
      _id: '6438452c7e6087963869437f',
      title: 'Перший створений івент',
      description:
        'Дуже довгий дескріпшн щоб перевірити як воно відображає його і дізнатись куди краще його вліпити та й в цілому може якось обрізати чи ще щось? Дуже довгий дескріпшн щоб перевірити як воно відображає його і дізнатись куди краще його вліпити та й в цілому може якось обрізати чи ще щось?',
      banner:
        'https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg',
      location: '{}',
      startEvent: '2023-04-13T15:50:21.000Z',
      endEvent: '2023-04-14T16:50:21.000Z',
      allDay: false,
      isPerformed: false,
      price: 1231,
      categories: [],
      organizer: {},
      attendees: [],
      maxAttendees: 44,
    },
    totalPages: 1,
    currentPage: 1,
    currentPageEvents: [],
    isLoading: false,
    success: true,
    paymentSuccess: false,
  },
  reducers: {
    setCurrentEvent(state, action) {
      state.event = action.payload;
      state.success = false;
    },
    setSuccessFalse(state) {
      state.success = false;
    },
    setPaymentSuccessFalse(state) {
      state.paymentSuccess = false;
    },
    filterEvents(state, action) {
      const filteredEvents = filterEventsUtil(
        action.payload.events,
        action.payload.filters
      );
      state.filteredEvents = filteredEvents;
      state.totalPages = countTotalPages(filteredEvents);
      state.currentPageEvents = getCurrentEvents(filteredEvents, 1);
      state.currentPage = 1;
    },
    changePage(state, action) {
      state.currentPage = action.payload.page;
      state.currentPageEvents = getCurrentEvents(
        action.payload.events,
        action.payload.page
      );
    },
    resetFilters(state) {
      const filteredEvents = filterEventsUtil(state.events, DEFAULT_FILTERS);
      state.filteredEvents = filteredEvents;
      state.totalPages = countTotalPages(filteredEvents);
      state.currentPageEvents = getCurrentEvents(filteredEvents, 1);
      state.currentPage = 1;
    },
  },
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.categoriesLoading = true;
    },
    [getCompanyEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [getEvent.pending]: (state) => {
      state.isLoading = true;
    },
    [subscribeEvent.pending]: (state) => {
      state.isLoading = true;
      state.success = false;
    },
    [getAllEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyEvents.pending]: (state) => {
      state.isLoading = true;
    },
    [createEvent.pending]: (state) => {
      state.isLoading = true;
      state.success = false;
    },
    [createComment.pending]: (state) => {
      state.success = false;
    },
    [acceptEventInvite.pending]: (state) => {
      state.isLoading = true;
    },
    [getTodayEvents.fulfilled]: (state, action) => {
      state.todayEvents = action.payload;
      state.isLoading = false;
    },
    [getCompanyEvents.fulfilled]: (state, action) => {
      state.companyEvents = action.payload;
    },
    [subscribeEvent.fulfilled]: (state) => {
      state.isLoading = false;
      state.paymentSuccess = true;
    },
    [getAllComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
    },
    [getEvent.fulfilled]: (state, action) => {
      state.event = action.payload;
      state.isLoading = false;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.categoriesLoading = false;
    },
    [getAllEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
      const filteredEvents = filterEventsUtil(action.payload, DEFAULT_FILTERS);
      state.filteredEvents = filteredEvents;
      state.totalPages = countTotalPages(filteredEvents);
      state.currentPageEvents = getCurrentEvents(filteredEvents, 1);
      state.currentPage = 1;
      state.isLoading = false;
    },
    [getMyEvents.fulfilled]: (state, action) => {
      state.events = action.payload;
      state.isLoading = false;
    },
    [createEvent.fulfilled]: (state, action) => {
      toast.success('Event has been successfully created!');
      state.events = [...state.events, action.payload];
      state.isLoading = false;
      state.success = true;
    },
    [createComment.fulfilled]: (state, action) => {
      toast.success('Comment has been successfully added!');
      state.comments = [...state.comments, action.payload];
    },
    [acceptEventInvite.fulfilled]: (state) => {
      toast.success('Invite has been successfully accepted!');
      state.isLoading = false;
    },
    [updateEvent.fulfilled]: (state) => {
      toast.success('Event has been successfully updated!');
      state.isLoading = false;
      state.success = true;
    },
    [deleteEvent.fulfilled]: (state, action) => {
      const id = action.payload;
      state.events = state.events.filter((item) => item._id !== id);
      toast.success('Event has been successfully deleted!');
      state.isLoading = false;
    },
    [getTodayEvents.rejected]: errorHandler,
    [getEvent.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload.message);
      console.log('Request error: ', action.payload);
    },
    [subscribeEvent.rejected]: errorHandler,
    [acceptEventInvite.rejected]: errorHandler,
    [getCompanyEvents.rejected]: errorHandler,
    [createComment.rejected]: errorHandler,
    [getAllComments.rejected]: errorHandler,
    [getCategories.rejected]: errorHandler,
    [getAllEvents.rejected]: errorHandler,
    [getMyEvents.rejected]: errorHandler,
    [updateEvent.rejected]: errorHandler,
  },
});

export const {
  setCurrentEvent,
  setSuccessFalse,
  updateFilters,
  clearFilters,
  filterEvents,
  resetFilters,
  changePage,
  setPaymentSuccessFalse,
} = eventSlice.actions;

export default eventSlice.reducer;
