import { combineSlices } from '@reduxjs/toolkit';
import { burgersSlice } from './slices/burgersSlice';
import { userSlice } from './slices/userSlice';
import { feedsSlice } from './slices/ordersSlice';

// для типизации посредника нужно заранее знать тип стора
// поэтому создаем корневой редюсер самостоятельно
export const reducer = combineSlices(burgersSlice, userSlice, feedsSlice);
