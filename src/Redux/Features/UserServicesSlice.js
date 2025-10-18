import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SellerService } from "../Services/SellerApi"; // ✅ your API service
import { UserService } from "../Services/UserApi";

// ---------------------- Thunks ----------------------

// Get All Users
export const GetUserData = createAsyncThunk(
  "Users/get",
  async ({ page, limit, filters } = {}, { rejectWithValue }) => {
    try {
      const res = await UserService.GetUser({ page, limit, filters });
      return res; // { sellers, total }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//  GetUserData by ID
export const GetUserById = createAsyncThunk(
  "Users/get/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await UserService.GetUserById(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete User
export const DeleteUser = createAsyncThunk(
  "Users/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await UserService.DeleteUser(id);

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Update User
export const UpdateUser = createAsyncThunk(
  "User/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await UserService.UpdateUser(id, data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ---------------------- Initial State ----------------------
const initialState = {
  Userdata: [], // ⬅️ fixed
  SingleUser: null,
  totalItems: 0,
  totalPages: 0,
  loading: false,
  error: null,
  updateerror: null,
};

// ---------------------- Slice ----------------------
export const UserServices = createSlice({
  name: "UserOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get All
      .addCase(GetUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.Userdata = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(GetUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(GetUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.SingleUser = action.payload.data;
      })
      .addCase(GetUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(DeleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg; // thunk ma id pass karyo che

        const index = state.sellerData.findIndex(
          (seller) => seller.id === deletedId
        );

        if (index !== -1) {
          state.Userdata[index] = {
            ...state.Userdata[index],
            status: "Deleted", // 👈 change status only
          };
        }
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Update
      .addCase(UpdateUser.pending, (state) => {
        state.loading = true;
        state.updateerror = null;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSeller = action.payload.data;
        const index = state.Userdata.findIndex(
          (seller) => seller.id === updatedSeller.id
        );
        if (index !== -1) {
          state.Userdata[index] = updatedSeller;
        }
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.updateerror = action.payload;
      });
  },
});
