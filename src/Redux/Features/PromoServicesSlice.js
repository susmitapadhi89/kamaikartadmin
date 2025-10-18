import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PromocodeService } from "../Services/PromocodeAPI";

// ---------------------- Thunks ----------------------

// Create Promo
export const CreatePromocode = createAsyncThunk(
  "Paymenttype/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await PromocodeService.AddPromocode(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get All PRomo
export const GetPromocodeData = createAsyncThunk(
  "Paymenttype/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await PromocodeService.GetPromocode();
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get Promo by ID
export const GetPromocodeDataById = createAsyncThunk(
  "Payment/get/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await PromocodeService.GetPromocodeById(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete Promo
export const DeletePromocodeData = createAsyncThunk(
  "paymenttype/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await PromocodeService.DeletePromocode(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Update Promo
export const UpdatePromocodeData = createAsyncThunk(
  "Paymenttype/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await PromocodeService.UpdatePromocode(id, data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ---------------------- Initial State ----------------------
const initialState = {
  PromocodeListData: [],
  SinglePromocodedata: null,
  Promocodeloading: false,
  Promocodeerror: null,
};

// ---------------------- Slice ----------------------
export const PromoCodeServices = createSlice({
  name: "PromoCodeOperation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(CreatePromocode.pending, (state) => {
        state.Paymentloading = true;
        state.Paymenterror = null;
      })

      .addCase(CreatePromocode.fulfilled, (state, action) => {
        state.Paymentloading = false;
        state.PromocodeListData.push(action.payload.data);
      })
      .addCase(CreatePromocode.rejected, (state, action) => {
        state.Paymentloading = false;
        state.Paymenterror = action.payload;
      })

      // Get All
      .addCase(GetPromocodeData.pending, (state) => {
        state.Paymentloading = true;
        state.Paymenterror = null;
      })
      .addCase(GetPromocodeData.fulfilled, (state, action) => {
        state.Paymentloading = false;
        state.PromocodeListData = action.payload.data;
      })
      .addCase(GetPromocodeData.rejected, (state, action) => {
        state.Paymentloading = false;
        state.Paymenterror = action.payload;
      })

      // Get By ID
      .addCase(GetPromocodeDataById.pending, (state) => {
        state.Paymentloading = true;
        state.Paymenterror = null;
      })
      .addCase(GetPromocodeDataById.fulfilled, (state, action) => {
        state.Paymentloading = false;
        state.SinglePromocodedata = action.payload.data;
      })
      .addCase(GetPromocodeDataById.rejected, (state, action) => {
        state.Paymentloading = false;
        state.Paymenterror = action.payload;
      })

      // Delete
      .addCase(DeletePromocodeData.pending, (state) => {
        state.Paymentloading = true;
        state.Paymenterror = null;
      })
      .addCase(DeletePromocodeData.fulfilled, (state, action) => {
        state.Paymentloading = false;
        const deletedId = action?.meta?.arg;
        state.PromocodeListData = state.PromocodeListData.filter(
          (payment) => payment.id !== deletedId
        );
      })
      .addCase(DeletePromocodeData.rejected, (state, action) => {
        state.Paymentloading = false;
        state.Paymenterror = action.payload;
      })

      // Update
      .addCase(UpdatePromocodeData.pending, (state) => {
        state.Paymentloading = true;
        state.Paymenterror = null;
      })
      .addCase(UpdatePromocodeData.fulfilled, (state, action) => {
        state.Paymentloading = false;

        const updatedPayment = action.payload.data;

        const index = state.PromocodeListData.findIndex(
          (payment) => payment.id === updatedPayment.id
        );
        if (index !== -1) {
          state.PromocodeListData[index] = updatedPayment;
        }
      })
      .addCase(UpdatePromocodeData.rejected, (state, action) => {
        state.Paymentloading = false;
        state.Paymenterror = action.payload;
      });
  },
});

export default PromoCodeServices.reducer;
