import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import appSlice from './store/slices/AppSlice';
import hireSlice from './store/slices/HireSlice';
import assetSlice from './store/slices/AssetSlice';
import bgSlice from './store/slices/BackgroundSlice';
import eventSlice from './store/slices/EventSlice';

const reducers = combineReducers({
  appReds: appSlice.reducer,
  hireSlice: hireSlice.reducer,
  assetSlice: assetSlice.reducer,
  bgSlice: bgSlice.reducer,
  eventSlice: eventSlice.reducer,
});

export const store = configureStore({
  reducer: reducers
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
