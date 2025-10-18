import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BrandService } from "../Services/BrandApi"; // ✅ your API service

// ---------------------- Thunks ----------------------

// Create Brand
export const CreateBrand = createAsyncThunk(
  "brand/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await BrandService.AddBrand(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get All Brands
export const GetBrandData = createAsyncThunk(
  "brand/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await BrandService.GetBrand();
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get Brand by ID
export const GetBrandById = createAsyncThunk(
  "brand/get/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await BrandService.GetBrandById(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete Brand
export const DeleteBrand = createAsyncThunk(
  "brand/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await BrandService.DeleteBrand(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Update Brand
export const UpdateBrand = createAsyncThunk(
  "brand/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await BrandService.UpdateBrand(id, data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ---------------------- Initial State ----------------------
const initialState = {
  brandData: [],
  singleBrand: null,
  loading: false,
  error: null,
};

// ---------------------- Slice ----------------------
export const BrandServices = createSlice({
  name: "BrandOperation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(CreateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brandData.push(action.payload.data);
      })
      .addCase(CreateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(GetBrandData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBrandData.fulfilled, (state, action) => {
        state.loading = false;
        state.brandData = action.payload.data;
      })
      .addCase(GetBrandData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(GetBrandById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBrandById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBrand = action.payload.data;
      })
      .addCase(GetBrandById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(DeleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action?.meta?.arg;
        state.brandData = state.brandData.filter(
          (brand) => brand.id !== deletedId
        );
      })
      .addCase(DeleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(UpdateBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateBrand.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBrand = action.payload.data;
        const index = state.brandData.findIndex(
          (brand) => brand.id === updatedBrand.id
        );
        if (index !== -1) {
          state.brandData[index] = updatedBrand;
        }
      })
      .addCase(UpdateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default BrandServices.reducer;
