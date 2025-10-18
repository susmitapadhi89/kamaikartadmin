import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RoleServices } from "../Services/RoleApi";
import { AuthServices } from "../Services/AuthAPi";

// ============================
// 🌀 Async Thunks
// ============================

export const Login = createAsyncThunk(
  "/Login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AuthServices.Login(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const Logout = createAsyncThunk(
  "/Logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AuthServices.Logout();

      return res.data; // return only data
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  isLoggedIn: false,
  error: null,
};

export const AuthService = createSlice({
  name: "authOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET Main
      .addCase(Login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
          "admin",
          JSON.stringify(action.payload.data.admin)
        ); // 👈 cache

        state.isLoggedIn = true;

        state.user = action.payload.data.user; // ✅ save user data
      })

      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(Logout.pending, (state) => {
        state.isLoggedIn = false;
        state.loading = true;
        state.error = null;
      })

      .addCase(Logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.user = null; // ✅ save user data
        localStorage.removeItem("admin");
        localStorage.removeItem("isLoggedIn");
      })

      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setLogin, logout } = AuthService.actions;
