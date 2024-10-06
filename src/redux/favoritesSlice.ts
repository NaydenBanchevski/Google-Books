import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
  id: string;
  title: string;
  description: string;
  src: string;
  ctaLink?: string;
  ctaText?: string;
}

type FavoritesState = Book[];

const initialState: FavoritesState = [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Book>) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<Book>) => {
      return state.filter((book) => book.id !== action.payload.id);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
export type { Book };
