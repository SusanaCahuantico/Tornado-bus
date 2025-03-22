import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import tripReducer from './tripSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    trips: tripReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;