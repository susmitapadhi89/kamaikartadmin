import { API } from "../../../Axios";

export const PaymentListService = {
  // Create new brand
  AddPaymentType: async (data) => {
    try {
      const res = await API.post("/paymentMethod", data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all brands
  GetPaymentType: async () => {
    try {
      const res = await API.get("/paymentMethod", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single brand by ID
  GetPaymemttypebyID: async (id) => {
    try {
      const res = await API.get(`/paymentMethod/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update brand
  UpdatePaymenttype: async (id, data) => {
    try {
      const res = await API.put(`/paymentMethod/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete brand
  Deletepaymenttype: async (id) => {
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
