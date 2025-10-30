import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TConstructorItems,
  TIngredient
} from '@utils-types';

type TConstructorState = {
  items: TConstructorItems;
};

const initialState: TConstructorState = {
  items: { bun: null, ingredients: [] }
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    constructorItemsSelector: (state) => state.items
  },
  reducers: {
    addConstructorItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.items.bun = { ...action.payload };
        } else {
          state.items.ingredients.push(action.payload);
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
        state.items.bun = null;
      } else {
        state.items.ingredients = state.items.ingredients.filter(
          (b) => b.id !== action.payload.id
        );
      }
    },
    moveConstructorItemUp: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.items.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );
      const temp = state.items.ingredients[index - 1];
      state.items.ingredients[index - 1] = action.payload;
      state.items.ingredients[index] = temp;
    },
    moveConstructorItemDown: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.items.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );
      const temp = state.items.ingredients[index + 1];
      state.items.ingredients[index + 1] = action.payload;
      state.items.ingredients[index] = temp;
    },
    setConstructorItems: (state, action: PayloadAction<TConstructorItems>) => {
      state.items = action.payload;
    }
  }
});

export const { constructorItemsSelector } = burgerConstructorSlice.selectors;
export const {
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItemDown,
  moveConstructorItemUp,
  setConstructorItems
} = burgerConstructorSlice.actions;
