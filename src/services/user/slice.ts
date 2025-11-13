import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { registerUser, loginUser, updateUser, logoutUser } from './actions';

export type TUserState = {
  isAuthChecked: boolean;
  data: TUser | null;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  data: null
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
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthChecked = true;
      console.log('Произошла ошибка: ' + action.error);
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload.user;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.data = null;
    });
  }
});

export const { setIsAuthChecked, setUser } = userSlice.actions;
export const { isAuthCheckedSelector, userSelector } = userSlice.selectors;
