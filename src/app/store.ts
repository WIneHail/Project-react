import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { fetchMeSlice } from './fetchMeSlice';
import modalSlice from './modalSlice';
import searchSlice from './searchSlice';

const rootReducer = combineSlices(modalSlice, fetchMeSlice, searchSlice);

export type RootState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
});

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;
