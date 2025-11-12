import { TOrderState } from "./slice";

export const initialState: TOrderState = {
  orders: [],
  orderRequest: false,
  isLoadingOrders: false,
  orderModalData: null
};
