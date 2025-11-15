import { getIngredients } from './actions';
import {
  ingredientsSlice,
  initialState,
  ingredientsSelector,
  isIngredientsLoadingSelector,
  constructorItemsSelector
} from './slice';
import { mockIngredientsData } from './ingredients.mock';
import { configureStore } from '@reduxjs/toolkit';

describe('ingredientsReducer', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('reducer корректно инициализируется', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  test('getIngredients - успешное получение ингредиентов', () => {
    const expectedState = { ...initialState, ingredients: mockIngredientsData };
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredientsData
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  test('getIngredients - ошибка', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Test GetIngredients Error Message' }
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual(initialState);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Произошла ошибка Test GetIngredients Error Message'
    );
  });

  test('getIngredients - ожидание получения ингредиентов', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  test('селектор ингредиентов', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      },
      preloadedState: {
        ingredients: { ...initialState, ingredients: mockIngredientsData }
      }
    });
    const selectedIngredients = ingredientsSelector(store.getState());
    expect(selectedIngredients).toEqual(mockIngredientsData);
  });

  test('селектор флага загрузки', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      },
      preloadedState: {
        ingredients: initialState
      }
    });
    const selectedIsLoading = isIngredientsLoadingSelector(store.getState());
    expect(selectedIsLoading).toBe(false);
  });

  test('селектор элементов конструктора', () => {
    const store = configureStore({
      reducer: {
        ingredients: ingredientsSlice.reducer
      },
      preloadedState: {
        ingredients: initialState
      }
    });
    const expectedItems = { bun: null, ingredients: [] };
    const selectedItems = constructorItemsSelector(store.getState());
    expect(selectedItems).toEqual(expectedItems);
  });
});
