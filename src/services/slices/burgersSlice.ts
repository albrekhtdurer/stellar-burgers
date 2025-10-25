import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export const getIngredients = createAsyncThunk(
  'burgers/getIngredients',
  async () => await getIngredientsApi()
);

type TBurgersState = {
  ingredients: TIngredient[] | null;
  getIngredientsError: unknown;
  isLoading: boolean;
  constructorItems: TConstructorItems;
};

type TConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgersState = {
  ingredients: null,
  getIngredientsError: null,
  isLoading: false,
  constructorItems: { bun: null, ingredients: [] }
};

export const burgersSlice = createSlice({
  name: 'burgers',
  initialState,
  selectors: {
    loadingSelector: (state) => state.isLoading,
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
        state.getIngredientsError = action.payload;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  reducers: {
    addConstructorItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = { ...action.payload };
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeConstructorItem: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = null;
      } else {
        state.constructorItems.ingredients =
          state.constructorItems.ingredients.filter(
            (b) => b.id !== action.payload.id
          );
      }
    },
    moveConstructorItemUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );
      const temp = state.constructorItems.ingredients[index - 1];
      state.constructorItems.ingredients[index - 1] = action.payload;
      state.constructorItems.ingredients[index] = temp;
    },
    moveConstructorItemDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.constructorItems.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );
      const temp = state.constructorItems.ingredients[index + 1];
      state.constructorItems.ingredients[index + 1] = action.payload;
      state.constructorItems.ingredients[index] = temp;
    }
  }
});

export const {
  loadingSelector,
  ingredientsSelector,
  constructorItemsSelector
} = burgersSlice.selectors;
export const {
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItemDown,
  moveConstructorItemUp
} = burgersSlice.actions;
