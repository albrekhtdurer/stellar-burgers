import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/slice';
import { burgerConstructorSlice } from './constructor/slice';
import { userSlice } from './user/slice';
import { feedsSlice } from './feeds/slice';
import { orderSlice } from './order/slice';

// для типизации посредника нужно заранее знать тип стора
// поэтому создаем корневой редюсер самостоятельно
export const reducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  userSlice,
  feedsSlice,
  orderSlice
);
