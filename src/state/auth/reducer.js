import { createSlice } from "@reduxjs/toolkit";
export const namespace = "auth";

// Reducer with inital state

const INITAL_STATE = {
  isAuthenticated: false,
  loading: false,
  user: null,
};

const slice = createSlice({
  name: namespace,
  initialState: INITAL_STATE,
  reducers: {
    signIn: (state) => ({
      ...state,
      loading: true,
    }),

    signOut: () => {
      return {
        ...INITAL_STATE,
      };
    },
  },
});

export const reducer = slice.reducer;

export const { signIn, signOut } = slice.actions;

export const authSelector = (state) => state[namespace];
