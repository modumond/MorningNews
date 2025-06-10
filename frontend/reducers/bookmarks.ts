import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleProps } from "../components/Article";

export interface BookmarksState {
  value: ArticleProps[];
}

const initialState: BookmarksState = {
  value: [],
};

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark: (
      state: BookmarksState,
      action: PayloadAction<ArticleProps>
    ) => {
      state.value.push(action.payload);
    },
    removeBookmark: (
      state: BookmarksState,
      action: PayloadAction<ArticleProps>
    ) => {
      state.value = state.value.filter(
        (bookmark) => bookmark.title !== action.payload.title
      );
    },
    removeAllBookmark: (state: BookmarksState) => {
      state.value = [];
    },
  },
});

export const { addBookmark, removeBookmark, removeAllBookmark } =
  bookmarksSlice.actions;
export default bookmarksSlice.reducer;
