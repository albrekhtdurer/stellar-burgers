import { expect, test, describe } from '@jest/globals';
import {
  burgerConstructorSlice,
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItemUp,
  moveConstructorItemDown
} from './slice';
import {
  defaultState,
  stateWithDeletedCrystals,
  stateWithCrystalsMovedUp
} from './constructor.mock';

describe('burgerConstructorSlice', () => {
  test('добавляем ингредиент', () => {
    const ingredientToAdd = {
      _id: '643d69a5c3f7b9001cfa0944',
      name: 'Соус традиционный галактический',
      type: 'sauce',
      proteins: 42,
      fat: 24,
      carbohydrates: 42,
      calories: 99,
      price: 15,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
    };
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
    const ingredientToRemove = {
      _id: '643d69a5c3f7b9001cfa0948',
      name: 'Кристаллы марсианских альфа-сахаридов',
      type: 'main',
      proteins: 234,
      fat: 432,
      carbohydrates: 111,
      calories: 189,
      price: 762,
      image: 'https://code.s3.yandex.net/react/code/core.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
      id: 'PX4jQCJIjsElnWShYfcxv'
    };
    const newState = burgerConstructorSlice.reducer(
      defaultState,
      removeConstructorItem(ingredientToRemove)
    );
    expect(newState).toEqual(stateWithDeletedCrystals);
  });
  test('двигаем ингредиент вверх', () => {
    const ingredientToMoveUp = {
      _id: '643d69a5c3f7b9001cfa0948',
      name: 'Кристаллы марсианских альфа-сахаридов',
      type: 'main',
      proteins: 234,
      fat: 432,
      carbohydrates: 111,
      calories: 189,
      price: 762,
      image: 'https://code.s3.yandex.net/react/code/core.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
      id: 'PX4jQCJIjsElnWShYfcxv'
    };
    const newState = burgerConstructorSlice.reducer(
      defaultState,
      moveConstructorItemUp(ingredientToMoveUp)
    );
    expect(newState).toEqual(stateWithCrystalsMovedUp);
  });
  test('двигаем ингредиент вниз', () => {
    const ingredientToMoveDown = {
      _id: '643d69a5c3f7b9001cfa0940',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      id: 'li6D9uuLKkrZDTpcUqsAY'
    };
    const newState = burgerConstructorSlice.reducer(
      defaultState,
      moveConstructorItemDown(ingredientToMoveDown)
    );
    expect(newState).toEqual(stateWithCrystalsMovedUp);
  });
});
