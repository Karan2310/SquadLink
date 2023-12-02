// store.js
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/UserSlice";
import AppReducer from "./slice/AppSclice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    app: AppReducer,
  },
});

export default store;
