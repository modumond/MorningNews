import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArticleProps } from "../components/Article";

export interface HiddenArticlesState {
  value: ArticleProps[];
}

const initialState: HiddenArticlesState = {
  value: [],
};

export const hiddenArticlesSlice = createSlice({
  name: "hiddenArticles",
  initialState,
  reducers: {
    hideArticle: (
      state: HiddenArticlesState,
      action: PayloadAction<ArticleProps>
    ) => {
      state.value.push(action.payload);
    },
    showAllArticles: (state: HiddenArticlesState) => {
      state.value = [];
    },
  },
});

export const { hideArticle, showAllArticles } = hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;
