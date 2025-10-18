import { API } from "../../../Axios";

export const PromocodeService = {
  // Create new Promo
  AddPromocode: async (data) => {
    try {
      const res = await API.post("/promocode", data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all Promo
  GetPromocode: async () => {
    try {
      const res = await API.get("/promocode", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single Promo by ID
  GetPromocodeById: async (id) => {
    try {
      const res = await API.get(`/promocode/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update promo
  UpdatePromocode: async (id, data) => {
    try {
      const res = await API.put(`/promocode/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete promo
  DeletePromocode: async (id) => {
    try {
      const res = await API.delete(`/promocode/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
