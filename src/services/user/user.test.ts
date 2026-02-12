import {
  initialState,
  userSlice,
  setIsAuthChecked,
  setUser,
  isAuthCheckedSelector,
  userSelector
} from './slice';
import { registerUser, loginUser, updateUser, logoutUser } from './actions';
import { TUser } from '@utils-types';
import { configureStore } from '@reduxjs/toolkit';

describe('userSlice', () => {
  const userData: TUser = {
    name: 'Вася Пупкин',
    email: 'superpupkin7000@ya.ru'
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('reducer корректно инициализируется', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('registerUser - успешная регистрация', () => {
    const expectedState = {
      ...initialState,
      data: userData,
      isAuthChecked: true
    };
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: userData }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  test('loginUser - успешный логин', () => {
    const expectedState = {
      ...initialState,
      data: userData,
      isAuthChecked: true
    };
    const action = {
      type: loginUser.fulfilled.type,
      payload: userData
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  test('loginUser - ошибка', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Test LoginUser Error Message' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
    expect(consoleSpy).toHaveBeenCalledWith(
      'Произошла ошибка: Test LoginUser Error Message'
    );
  });

  test('updateUser - успешное обновление', () => {
    const newUser = {
      name: 'Пупа Васькин',
      email: 'superpupkin7000@ya.ru'
    };
    const prevState = { ...initialState, data: userData };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: newUser }
    };
    const state = userSlice.reducer(prevState, action);
    expect(state).toEqual({
      ...prevState,
      data: { ...prevState.data, name: 'Пупа Васькин' }
    });
  });

  test('logoutUser - успешный выход', () => {
    const prevState = { ...initialState, data: userData };
    const action = {
      type: logoutUser.fulfilled.type
    };
    const state = userSlice.reducer(prevState, action);
    expect(state).toEqual(initialState);
  });

  test('устанавливаем isAuthChecked', () => {
    const state = userSlice.reducer(initialState, setIsAuthChecked(true));
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  test('устанавливаем данные пользователя', () => {
    const state = userSlice.reducer(initialState, setUser(userData));
    expect(state).toEqual({ ...initialState, data: userData });
  });

  const store = configureStore({
    reducer: {
      user: userSlice.reducer
    },
    preloadedState: {
      user: { ...initialState, data: userData }
    }
  });

  test('селектор флага проверки авторизации', () => {
    const selectedIsAuthChecked = isAuthCheckedSelector(store.getState());
    expect(selectedIsAuthChecked).toBe(false);
  });

  test('селектор юзера', () => {
    const selectedUser = userSelector(store.getState());
    expect(selectedUser).toEqual(userData);
  });
});
