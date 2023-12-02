// store.js
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice/UserSlice";
import AppReducer from "./slice/AppSclice";
import AdminReducer from "./slice/AdminSlice";

const store = configureStore({
  reducer: {
    users: UserReducer,
    app: AppReducer,
    admin: AdminReducer,
  },
});

export default store;
