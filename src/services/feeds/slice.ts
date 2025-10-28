import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeeds } from './actions';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload;
        state.orders = data.orders;
        state.total = data.total;
        state.totalToday = data.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        console.log('Произошла ошибка ' + action.error);
      });
  },
  selectors: {
    isFeedsLoadingSelector: (state) => state.isLoading,
    ordersSelector: (state) => state.orders,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday
  }
});

export const {
  ordersSelector,
  totalSelector,
  totalTodaySelector,
  isFeedsLoadingSelector
} = feedsSlice.selectors;
