import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: {
    token: string | null;
    username: string | null;
  };
}

interface PayloadActionState {
  token: string;
  username: string;
}

const initialState: UserState = {
  value: {
    token: null,
    username: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: UserState, action: PayloadAction<PayloadActionState>) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    },
    logout: (state: UserState) => {
      state.value.token = null;
      state.value.username = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
