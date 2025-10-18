import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PaymentListService } from "../Services/PaymentListApi";

// ---------------------- Thunks ----------------------

// Create Brand
export const CreatePaymentType = createAsyncThunk(
  "Paymenttype/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await PaymentListService.AddPaymentType(data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get All Brands
export const GetPaymenttypeData = createAsyncThunk(
  "Paymenttype/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await PaymentListService.GetPaymentType();
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Get Brand by ID
export const GetPaymenttypeById = createAsyncThunk(
  "Payment/get/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await PaymentListService.GetPaymemttypebyID(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Delete Brand
export const DeletePayment = createAsyncThunk(
  "paymenttype/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await PaymentListService.Deletepaymenttype(id);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Update Brand
export const UpdatePaymentType = createAsyncThunk(
  "Paymenttype/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await PaymentListService.UpdatePaymenttype(id, data);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ---------------------- Initial State ----------------------
const initialState = {
  PaymentListdata: [],
  SinglePaymenttypedata: null,
  Paymentloading: false,
  Paymenterror: null,
};

// ---------------------- Slice ----------------------
export const PaymentServices = createSlice({
  name: "PaymentOperation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(CreatePaymentType.pending, (state) => {
        state.Paymentloading = true;
        state.Paymenterror = null;
      })
      .addCase(CreatePaymentType.fulfilled, (state, action) => {
        state.Paymentloading = false;
        state.PaymentListdata.push(action.payload.data);
      })
      .addCase(CreatePaymentType.rejected, (state, action) => {
        state.Paymentloading = false;
        state.Paymenterror = action.payload;
      })

      // Get All
      .addCase(GetPaymenttypeData.pending, (state) => {
        state.Paymentloading = true;
        state.Paymenterror = null;
      })
      .addCase(GetPaymenttypeData.fulfilled, (state, action) => {
        state.Paymentloading = false;
        state.PaymentListdata = action.payload.data;
      })
      .addCase(GetPaymenttypeData.rejected, (state, action) => {
        state.Paymentloading = false;
        state.Paymenterror = action.payload;
      })

      // Get By ID
      .addCase(GetPaymenttypeById.pending, (state) => {
        state.Paymentloading = true;
        state.Paymenterror = null;
      })
      .addCase(GetPaymenttypeById.fulfilled, (state, action) => {
        state.Paymentloading = false;
        state.SinglePaymenttypedata = action.payload.data;
      })
      .addCase(GetPaymenttypeById.rejected, (state, action) => {
        state.Paymentloading = false;
        state.Paymenterror = action.payload;
      })

      // Delete
      .addCase(DeletePayment.pending, (state) => {
        state.Paymentloading = true;
        state.Paymenterror = null;
      })
      .addCase(DeletePayment.fulfilled, (state, action) => {
        state.Paymentloading = false;
        const deletedId = action?.meta?.arg;
        state.PaymentListdata = state.PaymentListdata.filter(
          (payment) => payment.id !== deletedId
        );
      })
      .addCase(DeletePayment.rejected, (state, action) => {
        state.Paymentloading = false;
        state.Paymenterror = action.payload;
      })

      // Update
      .addCase(UpdatePaymentType.pending, (state) => {
        state.Paymentloading = true;
        state.Paymenterror = null;
      })
      .addCase(UpdatePaymentType.fulfilled, (state, action) => {
        state.Paymentloading = false;

        const updatedPayment = action.payload.data;

        const index = state.PaymentListdata.findIndex(
          (payment) => payment.id === updatedPayment.id
        );
        if (index !== -1) {
          state.PaymentListdata[index] = updatedPayment;
        }
      })
      .addCase(UpdatePaymentType.rejected, (state, action) => {
        state.Paymentloading = false;
        state.Paymenterror = action.payload;
      });
  },
});

export default PaymentServices.reducer;
