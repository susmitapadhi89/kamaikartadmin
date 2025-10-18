import { API } from "../../../Axios";

export const BrandService = {
  // Create new brand
  AddBrand: async (data) => {
    try {
      const res = await API.post("/brand", data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all brands
  GetBrand: async () => {
    try {
      const res = await API.get("/brand", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single brand by ID
  GetBrandById: async (id) => {
    try {
      const res = await API.get(`/brand/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update brand
  UpdateBrand: async (id, data) => {
    try {
      const res = await API.put(`/brand/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete brand
  DeleteBrand: async (id) => {
    try {
      const res = await API.delete(`/brand/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
