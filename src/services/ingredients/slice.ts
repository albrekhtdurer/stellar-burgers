import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { getIngredients } from './actions';

export type TIngredientsState = {
  ingredients: TIngredient[] | null;
  isLoading: boolean;
  constructorItems: TConstructorItems;
};

type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TIngredientsState = {
  ingredients: null,
  isLoading: false,
  constructorItems: { bun: null, ingredients: [] }
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {
    isIngredientsLoadingSelector: (state) => state.isLoading,
    ingredientsSelector: (state) => state.ingredients,
    constructorItemsSelector: (state) => state.constructorItems
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        console.log('Произошла ошибка: ' + action.error);
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  reducers: {}
});

export const {
  isIngredientsLoadingSelector,
  ingredientsSelector,
  constructorItemsSelector
} = ingredientsSlice.selectors;
