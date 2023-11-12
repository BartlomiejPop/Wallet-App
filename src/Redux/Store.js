// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Twój własny plik slicera

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
