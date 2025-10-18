import { API } from "../../../Axios";

export const CategoryService = {
  AddMainCategory: async (data) => {
    try {
      const res = await API.post("/categories/main", data, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  AddSubCategory: async (data) => {
    try {
      const res = await API.post("/categories/sub", data, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  AddSubSubCategory: async (data) => {
    try {
      const res = await API.post("/categories/sub", data, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  GetMainCategory: async () => {
    try {
      const res = await API.get("/categories?parent_id=null", {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  GetSubCategory: async () => {
    try {
      const res = await API.get("/categories/sub", {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  GetSubCategoryByParent: async (parent_id) => {
    const res = await API.get(`/categories?parent_id=${parent_id}`, {
      withCredentials: true,
    });
    return res.data;
  },

  GetSubSubCategory: async () => {
    const res = await API.get(`/categories/sub-sub`, {
      withCredentials: true,
    });
    return res.data;
  },

  DeleteCategory: async (id) => {
    const res = await API.delete(`/categories/${id}`, {
      withCredentials: true,
    });
    return res.data;
  },

  GetPersonalCategoryData: async (id) => {
    const res = await API.get(`/categories/${id}`, { withCredentials: true });
    return res.data;
  },

  UpdateCategorydata: async (id, data) => {
    const res = await API.put(`/categories/${id}`, data, {
      withCredentials: true,
    });
    return res.data;
  },
};
