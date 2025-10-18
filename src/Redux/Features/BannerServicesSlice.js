import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BannerService } from "../Services/BannerApi"; // ✅ your API service

// ---------------------- Thunks ----------------------

// Create Banner
export const CreateBanner = createAsyncThunk(
  "banner/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await BannerService.AddBanner(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get All Banners
export const GetBannerData = createAsyncThunk(
  "banner/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await BannerService.GetBanner();
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get Banner by ID
export const GetBannerById = createAsyncThunk(
  "banner/get/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await BannerService.GetBannerById(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete Banner
export const DeleteBanner = createAsyncThunk(
  "banner/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await BannerService.DeleteBanner(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Update Banner
export const UpdateBanner = createAsyncThunk(
  "banner/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await BannerService.UpdateBanner(id, data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ---------------------- Initial State ----------------------
const initialState = {
  bannerData: [], // ⬅️ fixed
  singleBanner: null,
  loading: false,
  error: null,
};

// ---------------------- Slice ----------------------
export const BannerServices = createSlice({
  name: "BannerOperation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(CreateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateBanner.fulfilled, (state, action) => {
        state.loading = false;

        state.bannerData.push(action.payload.data);
      })
      .addCase(CreateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(GetBannerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBannerData.fulfilled, (state, action) => {
        state.loading = false;

        state.bannerData = action.payload.data;
      })
      .addCase(GetBannerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(GetBannerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBannerById.fulfilled, (state, action) => {
        state.loading = false;
        state.SingleBanner = action.payload.data;
      })
      .addCase(GetBannerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(DeleteBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteBanner.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action?.meta?.arg;
        state.bannerData = state.bannerData.filter(
          (banner) => banner.id !== deletedId
        );
      })
      .addCase(DeleteBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(UpdateBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateBanner.fulfilled, (state, action) => {
        state.loading = false;
        const updatedBanner = action.payload.data;
        const index = state.bannerData.findIndex(
          (banner) => banner.id === updatedBanner.id
        );
        if (index !== -1) {
          state.bannerData[index] = updatedBanner;
        }
      })
      .addCase(UpdateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default BannerServices.reducer;
