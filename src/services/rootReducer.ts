import { combineSlices } from '@reduxjs/toolkit';
import { burgersSlice } from './slices/burgersSlice';
import { userSlice } from './slices/userSlice';

// для типизации посредника нужно заранее знать тип стора
// поэтому создаем корневой редюсер самостоятельно
export const reducer = combineSlices(burgersSlice, userSlice);
