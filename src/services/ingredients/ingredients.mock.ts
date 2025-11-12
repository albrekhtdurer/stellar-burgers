import { TIngredientsState } from "./slice";

export const initialState: TIngredientsState = {
  ingredients: null,
  isLoading: false,
  constructorItems: { bun: null, ingredients: [] }
};
