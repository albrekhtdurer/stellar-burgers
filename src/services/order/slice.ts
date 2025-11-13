import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getUserOrders, sendOrder } from './actions';

export type TOrderState = {
  orders: TOrder[];
  isLoadingOrders: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const initialState: TOrderState = {
  orders: [],
  orderRequest: false,
  isLoadingOrders: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    userOrdersSelector: (state) => state.orders,
    orderRequestSelector: (state) => state.orderRequest,
    isOrdersLoadingSelector: (state) => state.isLoadingOrders,
    orderModalDataSelector: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.isLoadingOrders = false;
      state.orders = action.payload;
    });
    builder.addCase(getUserOrders.pending, (state) => {
      state.isLoadingOrders = true;
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.isLoadingOrders = false;
      console.log('Произошла ошибка');
    });

    builder.addCase(sendOrder.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(sendOrder.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderModalData = action.payload.order;
    });
    builder.addCase(sendOrder.rejected, (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    });
  }
});

export const { setOrderModalData } = orderSlice.actions;
export const {
  userOrdersSelector,
  orderRequestSelector,
  orderModalDataSelector,
  isOrdersLoadingSelector
} = orderSlice.selectors;
