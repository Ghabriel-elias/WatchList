import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface FavoritesProps {
  favorites: any[];
}

const initialState: FavoritesProps = {
  favorites: []
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<any>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<any>) => {
      state.favorites = state.favorites?.filter(favorite => favorite?.id != action.payload?.id)
    },
    clearFavorites: (state) => {
      state.favorites = initialState.favorites;
    }
  },
});

export const { addFavorite, clearFavorites, removeFavorite } = favoritesSlice.actions

export default favoritesSlice.reducer