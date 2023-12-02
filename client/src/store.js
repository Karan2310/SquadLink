// store.js
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/UserSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    // Add more reducers here if needed
  },
});

export default store;
