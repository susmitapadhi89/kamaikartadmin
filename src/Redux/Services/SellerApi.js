import { API } from "../../../Axios";

export const SellerService = {
  // Create new seller
  AddSeller: async (data) => {
    try {
      const res = await API.post("/seller", data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // getseller
  GetSeller: async ({ page, limit, filters } = {}) => {
    try {
      const res = await API.get("/seller", {
        params: { page, limit, ...filters }, // 🔹 query params
        withCredentials: true,
      });
      return res.data; // Expect: { sellers: [], total: number }
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single seller by ID
  GetSellerById: async (id) => {
    try {
      const res = await API.get(`/seller/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update seller
  UpdateSeller: async (id, data) => {
    try {
      const res = await API.put(`/seller/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete seller
  DeleteSeller: async (id) => {
    try {
      const res = await API.delete(`/seller/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
