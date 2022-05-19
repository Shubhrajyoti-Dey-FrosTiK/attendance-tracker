import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/User";
import faceRecognizedReducer from "./slices/FaceRecognized";

const rootReducer = combineReducers({
  user: userReducer,
  faceRecognized: faceRecognizedReducer,
});

export default rootReducer;
