import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../services/types";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    user: null,
  } as {
    accessToken: string | null;
    user: IUser | null;
  },
  reducers: {
    login(state, action: PayloadAction<{ accessToken: string; user: IUser }>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logout(state) {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
