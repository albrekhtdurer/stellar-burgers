import { expect, test, describe } from '@jest/globals';
import { initialState as constructorInitState } from './constructor/constructor.mock';
import { initialState as feedInitState } from './feeds/slice';
import { initialState as ingredientsInitState } from './ingredients/ingredients.mock';
import { initialState as orderInitState } from './order/order.mock';
import { initialState as userInitState } from './user/user.mock';
import { reducer } from './rootReducer';

describe('rootReducer', () => {
  test('rootReducer корректно инициализируется', () => {
    const initialState = {
      ingredients: ingredientsInitState,
      burgerConstructor: constructorInitState,
      user: userInitState,
      feeds: feedInitState,
      order: orderInitState
    };
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });
});
