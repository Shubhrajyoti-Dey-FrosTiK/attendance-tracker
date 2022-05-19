import { createSlice, current } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    userId: null,
    token: null,
    photo: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.photo = action.payload.photo;
    },
    deleteUser: (state) => {
      state.username = null;
      state.userId = null;
      state.token = null;
      state.photo = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, deleteUser } = userSlice.actions;

export const selectUser = (state) => {
  return state.user;
};

export default userSlice.reducer;
