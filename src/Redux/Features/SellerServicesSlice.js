import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SellerService } from "../Services/SellerApi"; // ✅ your API service

// ---------------------- Thunks ----------------------

// Create Seller
export const CreateSeller = createAsyncThunk(
  "seller/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await SellerService.AddSeller(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get All Sellers
export const GetSellerData = createAsyncThunk(
  "seller/get",
  async ({ page, limit, filters } = {}, { rejectWithValue }) => {
    try {
      const res = await SellerService.GetSeller({ page, limit, filters });

      return res; // { sellers, total }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Get Seller by ID
export const GetSellerById = createAsyncThunk(
  "seller/get/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await SellerService.GetSellerById(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete Seller
export const DeleteSeller = createAsyncThunk(
  "seller/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await SellerService.DeleteSeller(id);

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Update Seller
export const UpdateSeller = createAsyncThunk(
  "seller/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await SellerService.UpdateSeller(id, data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ---------------------- Initial State ----------------------
const initialState = {
  sellerData: [], // ⬅️ fixed
  SingleSeller: null,
  totalItems: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

// ---------------------- Slice ----------------------
export const SellerServices = createSlice({
  name: "SellerOperation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(CreateSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerData.push(action.payload.data);
      })
      .addCase(CreateSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(GetSellerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSellerData.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerData = action.payload.data;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(GetSellerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(GetSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSellerById.fulfilled, (state, action) => {
        state.loading = false;
        state.SingleSeller = action.payload.data;
      })
      .addCase(GetSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(DeleteSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteSeller.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg; // thunk ma id pass karyo che

        const index = state.sellerData.findIndex(
          (seller) => seller.id === deletedId
        );

        if (index !== -1) {
          state.sellerData[index] = {
            ...state.sellerData[index],
            status: "delete",
          };
        }
      })
      .addCase(DeleteSeller.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // Update
      .addCase(UpdateSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateSeller.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSeller = action.payload.data;
        const index = state.sellerData.findIndex(
          (seller) => seller.id === updatedSeller.id
        );
        if (index !== -1) {
          state.sellerData[index] = updatedSeller;
        }
      })
      .addCase(UpdateSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default SellerServices.reducer;
