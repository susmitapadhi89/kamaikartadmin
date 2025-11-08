import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SortOptionService } from "../Services/SortOptionApi";

// ---------------------- Thunks ----------------------

// Create sortOption
export const CreatesortOption = createAsyncThunk(
  "sortOption/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await SortOptionService.AddSortOption(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get All sortOptions
export const GetsortOptionData = createAsyncThunk(
  "sortOption/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await SortOptionService.GetSortOption();
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get sortOption by ID
export const GetsortOptionById = createAsyncThunk(
  "sortOption/get/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await SortOptionService.GetSortOptionById(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete sortOption
export const DeletesortOption = createAsyncThunk(
  "sortOption/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await SortOptionService.DeleteSortOption(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Update sortOption
export const UpdatesortOption = createAsyncThunk(
  "sortOption/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await SortOptionService.UpdateSortOption(id, data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ---------------------- Initial State ----------------------
const initialState = {
  sortOptionData: [],
  singlesortOption: null,
  loading: false,
  error: null,
};

// ---------------------- Slice ----------------------
export const sortOptionServices = createSlice({
  name: "sortOptionOperation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(CreatesortOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreatesortOption.fulfilled, (state, action) => {
        state.loading = false;
        state.sortOptionData.push(action.payload.data);
      })
      .addCase(CreatesortOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(GetsortOptionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetsortOptionData.fulfilled, (state, action) => {
        state.loading = false;
        state.sortOptionData = action.payload.data;
      })
      .addCase(GetsortOptionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get By ID
      .addCase(GetsortOptionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetsortOptionById.fulfilled, (state, action) => {
        state.loading = false;
        state.singlesortOption = action.payload.data;
      })
      .addCase(GetsortOptionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(DeletesortOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeletesortOption.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action?.meta?.arg;
        state.sortOptionData = state.sortOptionData.filter(
          (sortOption) => sortOption.id !== deletedId
        );
      })
      .addCase(DeletesortOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(UpdatesortOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdatesortOption.fulfilled, (state, action) => {
        state.loading = false;
        const updatedsortOption = action.payload.data;
        const index = state.sortOptionData.findIndex(
          (sortOption) => sortOption.id === updatedsortOption.id
        );
        if (index !== -1) {
          state.sortOptionData[index] = updatedsortOption;
        }
      })
      .addCase(UpdatesortOption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sortOptionServices.reducer;
