import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeeds, getOrder } from './actions';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoadingFeeds: boolean;
  selectedOrder: TOrder | null;
  isLoadingOrder: boolean;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoadingFeeds: false,
  selectedOrder: null,
  isLoadingOrder: false
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    setSelectedOrder(state, action: PayloadAction<TOrder>) {
      state.selectedOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoadingFeeds = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoadingFeeds = false;
        const data = action.payload;
        state.orders = data.orders;
        state.total = data.total;
        state.totalToday = data.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        console.log('Произошла ошибка ' + action.error);
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoadingOrder = true;
        state.selectedOrder = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoadingOrder = false;
        state.selectedOrder = action.payload.orders[0];
      })
      .addCase(getOrder.rejected, (state, action) => {
        console.log('Произошла ошибка ' + action.error);
      });
  },
  selectors: {
    isFeedsLoadingSelector: (state) => state.isLoadingFeeds,
    ordersSelector: (state) => state.orders,
    totalSelector: (state) => state.total,
    totalTodaySelector: (state) => state.totalToday,
    isOrderLoadingSelector: (state) => state.isLoadingOrder,
    selectedOrderSelector: (state) => state.selectedOrder
  }
});

export const {
  ordersSelector,
  totalSelector,
  totalTodaySelector,
  isFeedsLoadingSelector,
  isOrderLoadingSelector,
  selectedOrderSelector
} = feedsSlice.selectors;

export const { setSelectedOrder } = feedsSlice.actions;
