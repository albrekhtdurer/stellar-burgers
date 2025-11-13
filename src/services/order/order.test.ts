import { initialState, isOrdersLoadingSelector, orderModalDataSelector, orderRequestSelector, orderSlice, setOrderModalData, userOrdersSelector } from './slice';
import { mockUserOrdersData, mockSentOrderData } from './order.mock';
import { getUserOrders, sendOrder } from './actions';
import { configureStore } from '@reduxjs/toolkit';
import { isOrderLoadingSelector } from '../feeds/slice';

describe('orderSlice', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('reducer корректно инициализируется', () => {
    expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('getUserOrders - успешное получение заказов пользователя', () => {
    const expectedState = { ...initialState, orders: mockUserOrdersData };
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockUserOrdersData
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  test('getUserOrders - ошибка', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const action = {
      type: getUserOrders.rejected.type,
      error: { message: 'Test GetUserOrders Error Message' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Произошла ошибка Test GetUserOrders Error Message'
    );
  });

  test('getUserOrders - ожидание получения заказов пользователя', () => {
    const action = { type: getUserOrders.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoadingOrders: true });
  });

  test('sendOrder - успешная отправка заказа', () => {
    const orderData = mockSentOrderData;
    const action = { type: sendOrder.fulfilled.type, payload: orderData };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderModalData: orderData.order });
  });

  test('sendOrder - ошибка', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const action = {
      type: sendOrder.rejected.type,
      error: { message: 'Test SendOrder Error Message' }
    };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Произошла ошибка Test SendOrder Error Message'
    );
  });

  test('sendOrder - ожидание отправки заказа', () => {
    const action = { type: sendOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, orderRequest: true });
  });

  test('устанавливаем orderModalData', () => {
    const defaultState = {
      ...initialState,
      orderModalData: mockSentOrderData.order
    };
    const state = orderSlice.reducer(defaultState, setOrderModalData(null));
    expect(state).toEqual(initialState);
  });

  const store = configureStore({
    reducer: {
      order: orderSlice.reducer
    },
    preloadedState: {
      order: { ...initialState, orders: mockUserOrdersData }
    }
  });

  test('селектор заказов', () => {
    const userOrders = userOrdersSelector(store.getState());
    expect(userOrders).toEqual(mockUserOrdersData);
  });

  test('селектор флага загрузки заказов пользователя', () => {
    const selectedIsOrdersLoading = isOrdersLoadingSelector(store.getState());
    expect(selectedIsOrdersLoading).toBe(false);
  });

  test('селектор orderModalData', () => {
    const selectedOrderModalData = orderModalDataSelector(store.getState());
    expect(selectedOrderModalData).toBeNull();
  });

  test('селектор флага отправки заказа', () => {
    const selectedOrderRequest = orderRequestSelector(store.getState());
    expect(selectedOrderRequest).toBe(false);
  });
});
