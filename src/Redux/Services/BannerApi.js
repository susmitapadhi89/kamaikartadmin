import { API } from "../../../Axios";

export const BannerService = {
  // Create new banner
  AddBanner: async (data) => {
    try {
      const res = await API.post("/banner", data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all banners
  GetBanner: async () => {
    try {
      const res = await API.get("/banner", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single banner by ID
  GetBannerById: async (id) => {
    try {
      const res = await API.get(`/banner/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update banner
  UpdateBanner: async (id, data) => {
    try {
      const res = await API.put(`/banner/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete banner
  DeleteBanner: async (id) => {
    try {
      const res = await API.delete(`/banner/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
