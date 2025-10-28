import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getUserOrders, sendOrder } from './actions';

type TOrderState = {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TOrderState = {
  orders: [],
  orderRequest: false,
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
    orderModalDataSelector: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
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
  orderModalDataSelector
} = orderSlice.selectors;
