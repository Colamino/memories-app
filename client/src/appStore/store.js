import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../appFeatures/post/postSlice";
import authRouter from "../appFeatures/auth/authSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    auth: authRouter,
  },
});
