import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AttributeService } from "../Services/AttributeApi";

export const CreateAttribute = createAsyncThunk(
  "attribute/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AttributeService.AddAttribute(data);

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const CreateAttributeValue = createAsyncThunk(
  "attributevalue/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await AttributeService.AddAttributeValue(data);

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const GetAllAttributeData = createAsyncThunk(
  "attributevalue/All",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AttributeService.GetAllAttribute();

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const GetAttributeDataByID = createAsyncThunk(
  "attributevalue/BYID",
  async (id, { rejectWithValue }) => {
    try {
      const res = await AttributeService.GetAttributeBYID(id);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const DeleteAttributeByID = createAsyncThunk(
  "Delete/BYID",
  async (id, { rejectWithValue }) => {
    try {
      const res = await AttributeService.DeleteAttribute(id);

      return { data: res.data, id };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const UpdateAttributeinfo = createAsyncThunk(
  "Update/BYID",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await AttributeService.UpdateAttribute(id, data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
const initialState = {
  AttributeValue: [],
  AttributeCreateValue: null,
  PersonalAttributedata: null,
  loading: false,
  isLoggedIn: false,
  error: null,
};
export const AttributeServices = createSlice({
  name: "attributeOpration",
  initialState,
  extraReducers: (builder) => {
    builder

      //  add Main Category
      .addCase(CreateAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateAttribute.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(CreateAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(CreateAttributeValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateAttributeValue.fulfilled, (state, action) => {
        state.loading = false;
        state.AttributeCreateValue = action.payload.data;
      })
      .addCase(CreateAttributeValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetAllAttributeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllAttributeData.fulfilled, (state, action) => {
        state.loading = false;
        state.AttributeValue = action.payload;
      })
      .addCase(GetAllAttributeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(GetAttributeDataByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAttributeDataByID.fulfilled, (state, action) => {
        state.loading = false;
        state.PersonalAttributedata = action.payload.data;
      })
      .addCase(GetAttributeDataByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(DeleteAttributeByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteAttributeByID.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg; // The ID passed to the thunk

        // Filter out the deleted attribute from the data array
        if (
          state.AttributeValue &&
          state.AttributeValue.data &&
          Array.isArray(state.AttributeValue.data)
        ) {
          state.AttributeValue.data = state.AttributeValue.data.filter(
            (attr) => attr.id !== deletedId
          );
        }
      })

      .addCase(DeleteAttributeByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(UpdateAttributeinfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateAttributeinfo.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAttribute = action.payload.data;

        // Update the attribute in the list
        if (
          state.AttributeValue &&
          state.AttributeValue.data &&
          Array.isArray(state.AttributeValue.data)
        ) {
          const index = state.AttributeValue.data.findIndex(
            (attr) => attr.id === updatedAttribute.id
          );
          if (index !== -1) {
            state.AttributeValue.data[index] = {
              ...state.AttributeValue.data[index],
              ...updatedAttribute,
            };
          }
        }
      })

      .addCase(UpdateAttributeinfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
