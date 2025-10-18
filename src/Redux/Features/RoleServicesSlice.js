import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoleServices } from "../Services/RoleApi";

// ============================
// 🌀 Async Thunks
// ============================

export const getRole = createAsyncThunk(
  "Role/GetAllRole",
  async (rejectWithValue) => {
    try {
      const res = await RoleServices.GetAllRole();

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  Role: [],
  loading: false,
  error: null,
};

export const RoleService = createSlice({
  name: "RoleOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET Main
      .addCase(getRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.loading = false;
        state.Role = action.payload;
      })
      .addCase(getRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
