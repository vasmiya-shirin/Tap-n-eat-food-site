import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: { placed: false },
  reducers: {
    placeOrder: (state) => {
      state.placed = true;
    },
    resetOrder: (state) => {
      state.placed = false;
    },
  },
});

export const { placeOrder, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
