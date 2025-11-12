import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserOrders = createAsyncThunk('order/getUser', async () =>
  getOrdersApi()
);

export const sendOrder = createAsyncThunk(
  'orders/send',
  async (data: string[]) => orderBurgerApi(data)
);
