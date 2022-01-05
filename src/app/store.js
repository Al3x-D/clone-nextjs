import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

// the Global Store setup
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    // can be userslice
  },
});
