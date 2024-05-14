import {createSlice} from '@reduxjs/toolkit';

export const watchListSlice = createSlice({
  name: 'watchList',
  initialState: [],
  reducers: {
    addToWatchList: (state, action) => {
      const newWatchListItem = action.payload;
      return [...state, newWatchListItem];
    },
    removeFromWatchList: (state, action) => {
        const filteredWatchList = state.filter(watchListItem => {
            return action.payload.id !== watchListItem.id
        })
        return filteredWatchList
    },
  },
});

export const {addToWatchList, removeFromWatchList} = watchListSlice.actions;

export const selectWatchList = state => state.watchList;

export default watchListSlice.reducer;