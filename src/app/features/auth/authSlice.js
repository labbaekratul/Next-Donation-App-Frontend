import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

export const API = process.env.NEXT_PUBLIC_SERVER;

// ## USER OR ADMIN SIGNIN
export const userSigninAction = createAsyncThunk(
  "auth/userSignin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/signin`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// ## USER SIGNUP
export const userSignupAction = createAsyncThunk(
  "auth/userSignup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/signup`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSignoutAction = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: "auth/userSignout" });
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSignupAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userSignupAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true;
      localStorage.setItem("userInfo", JSON.stringify(payload));
    });
    builder.addCase(userSignupAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
      state.success = false;
    });

    builder.addCase(userSigninAction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userSigninAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true;
      localStorage.setItem("userInfo", JSON.stringify(payload));
    });
    builder.addCase(userSigninAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
      state.success = false;
    });
    builder.addCase("auth/userSignout", (state) => {
      state.userInfo = null;
      state.success = false;
    });
  },
});

export default authSlice.reducer;
