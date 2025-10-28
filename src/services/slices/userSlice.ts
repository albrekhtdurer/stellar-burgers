import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

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

export const getUserOrders = createAsyncThunk('user/getOrders', async () =>
  getOrdersApi()
);

export const sendUserOrder = createAsyncThunk(
  'user/sendOrder',
  async (data: string[]) => orderBurgerApi(data)
);

type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null;
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  orders: [],
  orderRequest: false,
  orderModalData: null
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
    },
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    userSelector: (state) => state.data,
    userOrdersSelector: (state) => state.orders,
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData
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
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.data = null;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(sendUserOrder.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(sendUserOrder.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderModalData = action.payload.order;
    });
    builder.addCase(sendUserOrder.rejected, (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    });
  }
});

export const { setIsAuthChecked, setUser, setOrderModalData } =
  userSlice.actions;
export const {
  isAuthCheckedSelector,
  userSelector,
  userOrdersSelector,
  orderRequestSelector,
  orderModalDataSelector
} = userSlice.selectors;
