import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryService } from "../Services/CategoryApi";
import { SubCategory } from "../../Pages/Category/SubCategory";

export const CreateMainCategory = createAsyncThunk(
  "maincategory/create",
  async (data, { rejectWithValue, getState }) => {
    try {
      const token = getState().AuthOpration.token;
      const res = CategoryService.AddMainCategory(data, token);
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const CreateSubCategory = createAsyncThunk(
  "subcategory/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CategoryService.AddSubCategory(data);

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const CreateSubSubCategory = createAsyncThunk(
  "subsubcategory/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CategoryService.AddSubSubCategory(data);

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const GetMainCategoryData = createAsyncThunk(
  "maincategory/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CategoryService.GetMainCategory();

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const GetSubCategoryData = createAsyncThunk(
  "subcategory/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CategoryService.GetSubCategory();

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const GetSubSubCategoryData = createAsyncThunk(
  "subsubcategory/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CategoryService.GetSubSubCategory();

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//get subcategoryby id
export const GetSubCategoryBYID = createAsyncThunk(
  "subcategory/get/id",
  async (parent_id, { rejectWithValue }) => {
    try {
      const res = await CategoryService.GetSubCategoryByParent(parent_id);

      return res;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong" // default fallback
      );
    }
  }
);

//Category data fetch by id
export const GetPersonalCategoryDataBYID = createAsyncThunk(
  "personnalcategorydata/get/id",
  async (parent_id, { rejectWithValue }) => {
    try {
      const res = await CategoryService.GetPersonalCategoryData(parent_id);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.response?.data ||
          "Something went wrong" // default fallback
      );
    }
  }
);

//delete category
export const DeleteCategory = createAsyncThunk(
  "Delete/Category",
  async (id, { rejectWithValue }) => {
    try {
      const res = await CategoryService.DeleteCategory(id);

      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

//updatew category
export const UpdateCategoryValue = createAsyncThunk(
  "Update/Category",
  async ({ id, data, type }, { rejectWithValue }) => {
    try {
      const res = await CategoryService.UpdateCategorydata(id, data);
      return { data: res.data, type };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  MainCategorydata: [],
  SubCategorydata: [],
  SubSubCategorydata: [],
  PersonalCategoryData: null,
  loading: false,
  error: null,
};

export const CategoryServices = createSlice({
  name: "CategoryOpration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //  add Main Category
      .addCase(CreateMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateMainCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.MainCategorydata.push(action.payload.data);
      })
      .addCase(CreateMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //addsub
      .addCase(CreateSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.SubCategorydata.push(action.payload.data);
      })
      .addCase(CreateSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //addsubsub
      .addCase(CreateSubSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateSubSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.SubSubCategorydata.push(action.payload.data);
      })
      .addCase(CreateSubSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetMainCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetMainCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.MainCategorydata = action.payload.data;
      })
      .addCase(GetMainCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetSubCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSubCategoryData.fulfilled, (state, action) => {
        state.loading = false;

        state.SubCategorydata = action.payload.data;
      })
      .addCase(GetSubCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetSubCategoryBYID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSubCategoryBYID.fulfilled, (state, action) => {
        state.loading = false;

        state.SubCategorydata = action.payload.data;
      })
      .addCase(GetSubCategoryBYID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(GetSubSubCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetSubSubCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.SubSubCategorydata = action.payload.data;
      })
      .addCase(GetSubSubCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(GetPersonalCategoryDataBYID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPersonalCategoryDataBYID.fulfilled, (state, action) => {
        state.loading = false;

        state.PersonalCategoryData = action.payload.data;
      })
      .addCase(GetPersonalCategoryDataBYID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Delete category
      .addCase(DeleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteCategory.fulfilled, (state, action) => {
        state.loading = false;

        const deleted = action.payload.data; // response from API
        const deleteType = deleted.delete; // "maincat" | "subcat" | "subsub"

        if (deleteType === "main") {
          state.MainCategorydata = state.MainCategorydata.filter(
            (cat) => cat.id !== deleted.id
          );
        } else if (deleteType === "sub") {
          state.SubCategorydata = state.SubCategorydata.filter(
            (cat) => cat.id !== deleted.id
          );
        } else if (deleteType === "subsub") {
          state.SubSubCategorydata = state.SubSubCategorydata.filter(
            (cat) => cat.id !== deleted.id
          );
        }
      })
      .addCase(DeleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Update
      .addCase(UpdateCategoryValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // .addCase(UpdateCategoryValue.fulfilled, (state, action) => {
      //   state.loading = false;

      //   const { data: updatedCategory, type } = action.payload;

      //   // Find index of updated category
      //   const index = state.SubSubCategorydata.findIndex(
      //     (item) => item.id === updatedCategory.id
      //   );

      //   if (index !== -1) {
      //     // Replace the old object with updated object
      //     state.SubSubCategorydata[index] = updatedCategory;
      //   } else {
      //     // If not found (just in case), push it
      //     state.SubSubCategorydata.push(updatedCategory);
      //   }
      // })
      .addCase(UpdateCategoryValue.fulfilled, (state, action) => {
        state.loading = false;

        const { data: updatedCategory, type } = action.payload;

        let targetArray;
        if (type === "main") targetArray = state.MainCategorydata;
        else if (type === "sub") targetArray = state.SubCategorydata;
        else if (type === "subsub") targetArray = state.SubSubCategorydata;
        else return; // invalid type

        const index = targetArray.findIndex(
          (item) => item.id === updatedCategory.id
        );

        if (index !== -1) {
          // Replace the entire object
          targetArray[index] = updatedCategory;
        } else {
          // Push if not found
          targetArray.push(updatedCategory);
        }
      })

      .addCase(UpdateCategoryValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
