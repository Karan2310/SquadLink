import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../config";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (cookies, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
          "x-auth-token": cookies,
        },
      };
      const response = await axios.get(`${SERVER_URL}/auth/verify`, config);
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export const { setUser, logoutUser } = UserSlice.actions;
export default UserSlice.reducer;
