import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import routinesReducer from '../features/routines/routinesSlice';

export const store = configureStore({
  reducer: {
    routines: routinesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
