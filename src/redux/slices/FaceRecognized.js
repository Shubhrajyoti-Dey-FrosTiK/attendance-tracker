import { createSlice } from "@reduxjs/toolkit";

export const faceRecognizedSlice = createSlice({
  name: "faceRecognized",
  initialState: {
    faceRecognized: false,
  },
  reducers: {
    changeFaceRecognizedState: (state, action) => {
      state.faceRecognized = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeFaceRecognizedState } = faceRecognizedSlice.actions;

export const selectFaceRecognized = (state) => {
  return state.faceRecognized;
};

export default faceRecognizedSlice.reducer;
