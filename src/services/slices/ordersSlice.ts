import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getFeeds = createAsyncThunk(
  'feeds/get',
  async () => await getFeedsApi()
);

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      const data = action.payload;
      state.orders = data.orders;
      state.total = data.total;
      state.totalToday = data.totalToday;
    });
  },
  selectors: {
    ordersSelector: (state) => state.orders,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  }
});

export const { ordersSelector, totalSelector, totalTodaySelector } =
  feedsSlice.selectors;
