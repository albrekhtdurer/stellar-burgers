import {
  TRegisterData,
  registerUserApi,
  TLoginData,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { setUser, setIsAuthChecked } from './slice';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData) => registerUserApi(userData)
);

// TODO: подумать про обработку ошибки
export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TLoginData) => {
    const loginData = await loginUserApi(userData);
    setCookie('accessToken', loginData.accessToken);
    localStorage.setItem('refreshToken', loginData.refreshToken);
    return loginData.user;
  }
);

export const checkUserAuthentication = createAsyncThunk(
  'user/checkUserAuthentication',
  async (_, { dispatch }) => {
    try {
      if (getCookie('accessToken')) {
        const data = await getUserApi();
        dispatch(setUser(data.user));
      }
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: Partial<TRegisterData>) => updateUserApi(userData)
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});
