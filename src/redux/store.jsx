import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice"
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order:orderReducer,
  },
});
