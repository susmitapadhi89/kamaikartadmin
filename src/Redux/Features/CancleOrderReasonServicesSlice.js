// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { CancleOrderReasonService } from "../Services/CancleOrderReasonApi";

// export const CreateReason = createAsyncThunk(
//   "Reason/create",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = CancleOrderReasonService.AddReason(data);
//       return res;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Something went wrong");
//     }
//   }
// );

// export const GetReasonData = createAsyncThunk(
//   "Reason/all/get",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await CancleOrderReasonService.GetallReason();

//       return res;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Something went wrong");
//     }
//   }
// );

// //get subcategoryby id
// export const GetReasonDataBYID = createAsyncThunk(
//   "Reason/get/id",
//   async (reasonid, { rejectWithValue }) => {
//     try {
//       const res = await CancleOrderReasonService.GetReasonById(reasonid);

//       return res;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message ||
//           err.response?.data ||
//           "Something went wrong" // default fallback
//       );
//     }
//   }
// );

// //delete category
// export const DeleteReasonData = createAsyncThunk(
//   "Delete/Reason",
//   async (reasonid, { rejectWithValue }) => {
//     try {
//       const res = await CancleOrderReasonService.Deletereason(reasonid);

//       return res;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Something went wrong");
//     }
//   }
// );

// //updatew category
// export const UpdateReasonData = createAsyncThunk(
//   "Update/reason",
//   async ({ reasonid, data }, { rejectWithValue }) => {
//     try {
//       const res = await CancleOrderReasonService.UpdateReason(reasonid, data);
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Something went wrong");
//     }
//   }
// );

// const initialState = {
//   ReasonData: [],
//   PersonalReasonData: null,
//   loading: false,
//   error: null,
// };

// export const ReturnOrderReasonServices = createSlice({
//   name: "ReturnOrderReason",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder

//       //  add Main Category
//       .addCase(CreateReason.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(CreateReason.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ReasonData.push(action.payload.data);
//       })
//       .addCase(CreateReason.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(GetReasonData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(GetReasonData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.ReasonData = action.payload.data;
//       })
//       .addCase(GetReasonData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(GetReasonDataBYID.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(GetReasonDataBYID.fulfilled, (state, action) => {
//         state.loading = false;

//         state.PersonalReasonData = action.payload.data;
//       })
//       .addCase(GetReasonDataBYID.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       //Delete category
//       .addCase(DeleteReasonData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(DeleteReasonData.fulfilled, (state, action) => {
//         state.loading = false;

//         const deleted = action.payload.data; // response from API
//       })
//       .addCase(DeleteReasonData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       //Update
//       .addCase(UpdateReasonData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(UpdateReasonData.fulfilled, (state, action) => {
//         state.loading = false;
//       })

//       .addCase(UpdateReasonData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CancleOrderReasonService } from "../Services/CancleOrderReasonApi";

// ✅ Create Reason
export const CreateReason = createAsyncThunk(
  "Reason/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CancleOrderReasonService.AddReason(data);
      return res.data; // ✅ Use res.data to get actual payload
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ✅ Get All Reasons
export const GetReasonData = createAsyncThunk(
  "Reason/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CancleOrderReasonService.GetallReason();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ✅ Get Reason by ID
export const GetReasonDataById = createAsyncThunk(
  "Reason/getById",
  async (reasonId, { rejectWithValue }) => {
    try {
      const res = await CancleOrderReasonService.GetReasonById(reasonId);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          "Something went wrong"
      );
    }
  }
);

// ✅ Delete Reason
export const DeleteReasonData = createAsyncThunk(
  "Reason/delete",
  async (reasonId, { rejectWithValue }) => {
    try {
      const res = await CancleOrderReasonService.Deletereason(reasonId);
      return { id: reasonId, ...res.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ✅ Update Reason
export const UpdateReasonData = createAsyncThunk(
  "Reason/update",
  async ({ reasonId, data }, { rejectWithValue }) => {
    try {
      const res = await CancleOrderReasonService.UpdateReason(reasonId, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ✅ Initial State
const initialState = {
  ReasonData: [],
  PersonalReasonData: null,
  loading: false,
  error: null,
  successMessage: null,
};

// ✅ Slice
export const CancelOrderReasonServices = createSlice({
  name: "CancelOrderReasonOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(CreateReason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateReason.fulfilled, (state, action) => {
        state.loading = false;
        state.ReasonData.push(action.payload);
        state.successMessage = "Reason created successfully.";
      })
      .addCase(CreateReason.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL
      .addCase(GetReasonData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetReasonData.fulfilled, (state, action) => {
        state.loading = false;
        state.ReasonData = action.payload || [];
      })
      .addCase(GetReasonData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET BY ID
      .addCase(GetReasonDataById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetReasonDataById.fulfilled, (state, action) => {
        state.loading = false;
        state.PersonalReasonData = action.payload;
      })
      .addCase(GetReasonDataById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(DeleteReasonData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteReasonData.fulfilled, (state, action) => {
        state.loading = false;
        state.ReasonData = state.ReasonData.filter(
          (item) => item.id !== action.payload.id
        );
        state.successMessage = "Reason deleted successfully.";
      })
      .addCase(DeleteReasonData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(UpdateReasonData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateReasonData.fulfilled, (state, action) => {
        state.loading = false;
        state.ReasonData = state.ReasonData.map((reason) =>
          reason.id === action.payload.id ? action.payload : reason
        );
        state.successMessage = "Reason updated successfully.";
      })
      .addCase(UpdateReasonData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export actions and reducer
