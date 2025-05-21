import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const hiddenArticlesSlice = createSlice({
	name: 'hiddenArticles',
	initialState,
	reducers: {
		hideArticle: (state, action) => {
			state.value.push(action.payload);
		},
		showAllArticles: (state) => {
			state.value = [];
		},
	},
});

export const { hideArticle, showAllArticles } = hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;
