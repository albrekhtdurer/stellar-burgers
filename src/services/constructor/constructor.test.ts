import { expect, test, describe } from '@jest/globals';
import {
  burgerConstructorSlice,
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItemUp,
  moveConstructorItemDown,
  TConstructorState
} from './slice';
import { mockIngredientsData } from '../ingredients/ingredients.mock';

describe('burgerConstructorSlice', () => {
  const defaultState: TConstructorState = {
    items: {
      bun: { ...mockIngredientsData[0], id: '1' },
      ingredients: [
        { ...mockIngredientsData[1], id: '2' },
        { ...mockIngredientsData[2], id: '3' },
        { ...mockIngredientsData[6], id: '4' },
        { ...mockIngredientsData[12], id: '5' },
        { ...mockIngredientsData[4], id: '6' }
      ]
    }
  };

  const indexToMove = 3;

  test('добавляем ингредиент', () => {
    const ingredientToAdd = mockIngredientsData[8];
    const newState = burgerConstructorSlice.reducer(
      defaultState,
      addConstructorItem(ingredientToAdd)
    );
    // забираем последний ингредиент из нового стейта
    const newIngredient =
      newState.items.ingredients[newState.items.ingredients.length - 1];
    expect(newState).toEqual({
      ...defaultState,
      items: {
        ...defaultState.items,
        ingredients: [...defaultState.items.ingredients, newIngredient]
      }
    });
  });

  test('удаляем ингредиент', () => {
    const indexToDelete = 2;
    const newState = burgerConstructorSlice.reducer(
      defaultState,
      removeConstructorItem(defaultState.items.ingredients[indexToDelete])
    );
    const expectedState = {
      ...defaultState,
      items: {
        ...defaultState.items,
        ingredients: [
          ...defaultState.items.ingredients.slice(0, indexToDelete),
          ...defaultState.items.ingredients.slice(indexToDelete + 1)
        ]
      }
    };
    expect(newState).toEqual(expectedState);
  });
  test('двигаем ингредиент вверх', () => {
    const expectedState = {
      ...defaultState,
      items: {
        ...defaultState.items,
        ingredients: [
          ...defaultState.items.ingredients.slice(0, indexToMove - 1),
          { ...defaultState.items.ingredients[indexToMove] },
          { ...defaultState.items.ingredients[indexToMove - 1] },
          ...defaultState.items.ingredients.slice(indexToMove + 1)
        ]
      }
    };
    const newState = burgerConstructorSlice.reducer(
      defaultState,
      moveConstructorItemUp(defaultState.items.ingredients[indexToMove])
    );
    expect(newState).toEqual(expectedState);
  });
  test('двигаем ингредиент вниз', () => {
    const expectedState = {
      ...defaultState,
      items: {
        ...defaultState.items,
        ingredients: [
          ...defaultState.items.ingredients.slice(0, indexToMove),
          { ...defaultState.items.ingredients[indexToMove + 1] },
          { ...defaultState.items.ingredients[indexToMove] },
          ...defaultState.items.ingredients.slice(indexToMove + 2)
        ]
      }
    };
    const newState = burgerConstructorSlice.reducer(
      defaultState,
      moveConstructorItemDown(defaultState.items.ingredients[indexToMove])
    );
    expect(newState).toEqual(expectedState);
  });
});
