import { API } from "../../../Axios";

export const SortOptionService = {
  // Create new SortOption
  AddSortOption: async (data) => {
    try {
      const res = await API.post("/admin/sortOption", data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all SortOption
  GetSortOption: async () => {
    try {
      const res = await API.get("/admin/sortOption", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single SortOption by ID
  GetSortOptionById: async (id) => {
    try {
      const res = await API.get(`/admin/sortOption/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // UpdateSortOption
  UpdateSortOption: async (id, data) => {
    try {
      const res = await API.put(`/admin/sortOption/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete SortOptionSortOption
  DeleteSortOption: async (id) => {
    try {
      const res = await API.delete(`/admin/sortOption/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
