import { API } from "../../../Axios";

export const CancleOrderReasonService = {
  // AddReason
  AddReason: async (data) => {
    try {
      const res = await API.post("/cancelReason", data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // GetallReason
  GetallReason: async () => {
    try {
      const res = await API.get("/cancelReason", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // GetReasonById
  GetReasonById: async (reasonid) => {
    try {
      const res = await API.get(`/cancelReason/${reasonid}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // UpdateReason
  UpdateReason: async (reasonId, data) => {
    try {
      const res = await API.put(`/cancelReason/${reasonId}`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Deletereason
  Deletereason: async (id) => {
    try {
      const res = await API.delete(`/cancelReason/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
