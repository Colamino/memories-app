import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index";

const initialState = {
  authUser: null,
  isLoading: true,
};

export const signin = createAsyncThunk("auth/signin", async (data) => {
  const { formData, navigate } = data;
  try {
    const { data } = await api.signIn(formData);

    navigate("/");
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const signup = createAsyncThunk("auth/signup", async (data) => {
  const { formData, navigate } = data;
  try {
    const { data } = await api.signUp(formData);

    navigate("/");
    return data;
  } catch (err) {
    console.log(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signin.pending]: (state) => {
      state.isLoading = true;
    },
    [signin.fulfilled]: (state, action) => {
      // set item in empty array
      state.authUser = action.payload;
      state.isLoading = false;
    },
    [signin.rejected]: (state) => {
      state.isLoading = false;
    },
    [signup.pending]: (state) => {
      state.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      // set item in empty array
      state.authUser = action.payload;
      state.isLoading = false;
    },
    [signup.rejected]: (state) => {
      state.isLoading = false;
    },
    [signin.googleSignin]: (state) => {
      state.isLoading = true;
    },
    [signin.googleSignin]: (state, action) => {
      // set item in empty array
      state.googleUser = action.payload.user;
      state.isLoading = false;
    },
    [signin.googleSignin]: (state) => {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
