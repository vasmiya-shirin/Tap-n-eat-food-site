import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
