import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SiteConfigurationSerivce } from "../Services/SliceConfigurationApi";

export const GetsiteInfromationdata = createAsyncThunk(
  "get/siteinformation",
  async (_, { rejectWithValue }) => {
    try {
      const res = await SiteConfigurationSerivce.GetSiteinfo();
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const UpdatesiteInfromationdata = createAsyncThunk(
  "Update/siteinformation",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await SiteConfigurationSerivce.UpdateSiteinfo(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
const initialState = {
  Siteinfo: {},
  error: null,
  loading: null,
};

export const SiteConfigurationSerivces = createSlice({
  name: "SiteConfigurationOpraion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetsiteInfromationdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetsiteInfromationdata.fulfilled, (state, action) => {
        state.Siteinfo = action.payload.data;

        state.loading = false;
        state.error = null;
      })
      .addCase(GetsiteInfromationdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(UpdatesiteInfromationdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdatesiteInfromationdata.fulfilled, (state, action) => {
        state.Siteinfo = action.payload.data;

        state.loading = false;
        state.error = null;
      })
      .addCase(UpdatesiteInfromationdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
