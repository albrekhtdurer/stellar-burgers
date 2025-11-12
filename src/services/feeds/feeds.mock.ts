import { TFeedState } from './slice';

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  selectedOrder: null,
  isLoadingOrder: false
};
