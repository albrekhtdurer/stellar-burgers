import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'burgers/getIngredients',
  async () => await getIngredientsApi()
);

type TBurgersState = {
  ingredients: TIngredient[] | null;
  getIngredientsError: unknown;
  isLoading: boolean;
};

const initialState: TBurgersState = {
  ingredients: null,
  getIngredientsError: null,
  isLoading: false
};

export const burgersSlice = createSlice({
  name: 'burgers',
  initialState,
  selectors: {
    loadingSelector: (state) => state.isLoading,
    ingredientsSelector: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.getIngredientsError = action.payload;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  reducers: {}
});

export const { loadingSelector, ingredientsSelector } = burgersSlice.selectors;
