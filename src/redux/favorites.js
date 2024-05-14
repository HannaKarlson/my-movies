import {createSlice} from '@reduxjs/toolkit';

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      const newFavorite = action.payload;
      return [...state, newFavorite];
    },
    removeFavorite: (state, action) => {
        const filteredFavorites = state.filter(favorite => {
            return action.payload.id !== favorite.id
        })
        return filteredFavorites
    },
  },
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;

export const selectFavorites = state => state.favorites;

export default favoritesSlice.reducer;
