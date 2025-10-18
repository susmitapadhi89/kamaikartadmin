import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BannerService } from "../Services/BannerApi"; // ✅ your API service
import { OfferBannerService } from "../Services/OfferApi";

// ---------------------- Thunks ----------------------

// Create Banner
export const CreateOfferBanner = createAsyncThunk(
  "offerbanner/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await OfferBannerService.AddOfferBanner(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get All Banners
export const GetOfferBannerData = createAsyncThunk(
  "offerbanner/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await OfferBannerService.GetOfferBanner();
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete Banner
export const DeleteOfferBanner = createAsyncThunk(
  "offerbanner/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await OfferBannerService.DeleteOfferBanner(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ---------------------- Initial State ----------------------
const initialState = {
  OfferbannerData: [], // ⬅️ fixed
  loading: false,
  error: null,
};

// ---------------------- Slice ----------------------
export const OfferServices = createSlice({
  name: "OfferOperation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(CreateOfferBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateOfferBanner.fulfilled, (state, action) => {
        state.loading = false;

        state.OfferbannerData.push(action.payload.data);
      })
      .addCase(CreateOfferBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(GetOfferBannerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetOfferBannerData.fulfilled, (state, action) => {
        state.loading = false;

        console.log(action.payload.data);

        state.OfferbannerData = action.payload.data;
      })
      .addCase(GetOfferBannerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(DeleteOfferBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteOfferBanner.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action?.meta?.arg;
        state.OfferbannerData = state.OfferbannerData.filter(
          (banner) => banner.id !== deletedId
        );
      })
      .addCase(DeleteOfferBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default OfferBannerService.reducer;
