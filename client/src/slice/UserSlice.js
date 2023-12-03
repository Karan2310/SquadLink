import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: [], // Assuming initialState is an array of user objects
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    updateUsers: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      const idToDelete = action.payload;
      return {
        ...state,
        users: state.users.filter((user) => user.id !== idToDelete),
      };
    },
  },
});

export const { setUser, updateUsers, deleteUser } = userSlice.actions;
export default userSlice.reducer;
