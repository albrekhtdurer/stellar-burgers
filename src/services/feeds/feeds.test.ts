import { getFeeds, getOrder } from './actions';
import { mockOrdersData } from './feeds.mock';
import { feedsSlice, initialState } from './slice';

describe('feedsReducer', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('reducer корректно инициализируется', () => {
    expect(feedsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('getFeeds - успешное получение ленты заказов', () => {
    const expectedState = {
      ...initialState,
      orders: mockOrdersData.orders,
      total: mockOrdersData.total,
      totalToday: mockOrdersData.totalToday
    };
    const action = { type: getFeeds.fulfilled.type, payload: mockOrdersData };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  test('getFeeds - ошибка получения ленты заказов', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Test GetFeeds Error Message' }
    };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Произошла ошибка Test GetFeeds Error Message'
    );
  });

  test('getFeeds - ожидание получения ленты заказов', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  test('getOrder - успешное получение заказа', () => {
    const orderToSearch = mockOrdersData.orders[0];
    const expectedState = { ...initialState, selectedOrder: orderToSearch };
    const action = { type: getOrder.fulfilled.type, payload: mockOrdersData };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  test('getOrder - ошибка получения заказа', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const action = {
      type: getOrder.rejected.type,
      error: { message: 'Test GetOrder Error Message' }
    };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Произошла ошибка Test GetOrder Error Message'
    );
  });

  test('getOrder - ожидание получения заказа', () => {
    const action = { type: getOrder.pending.type };
    const state = feedsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoadingOrder: true });
  });
});
