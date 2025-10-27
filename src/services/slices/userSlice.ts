import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie } from '../../utils/cookie';

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

type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.data = action.payload;
    }
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    userSelector: (state) => state.data
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.data = action.payload.user;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthChecked = true;
      state.data = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload.user;
    });
  }
});

export const { setIsAuthChecked, setUser } = userSlice.actions;
export const { isAuthCheckedSelector, userSelector } = userSlice.selectors;
