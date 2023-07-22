import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../auth/authSlice";
import { getTokenFromLocalStorage } from "@/app/helpers/mixin";

const initialState = {
  loading: false,
  data: null,
  success: false,
  error: null,
};

// Create an async thunk action to delete a user
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId, { rejectWithValue }) => {
    try {
      const { token } = getTokenFromLocalStorage("userInfo");
      if (!token) {
        throw new Error("Token not found");
      }
      const response = await axios.delete(`${API}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.data = payload;
    });
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    });
  },
});

export default deleteUserSlice.reducer;
