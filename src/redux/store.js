import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favorites';
import watchListReducer from './watchList'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    watchList:watchListReducer
  },
});