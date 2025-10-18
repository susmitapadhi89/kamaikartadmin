import { API } from "../../../Axios";
import { DeleteAttributeByID } from "../Features/AttributeServicesSlice";

export const AttributeService = {
  AddAttribute: async (data) => {
    try {
      const res = await API.post("/attribute", data, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  AddAttributeValue: async (data) => {
    try {
      const res = await API.post("/attribute/values", data, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  GetAllAttribute: async () => {
    try {
      const res = await API.get("/attribute", {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  GetAttributeBYID: async (id) => {
    try {
      const res = await API.get(`/attribute/${id}`, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  DeleteAttribute: async (id) => {
    try {
      const res = await API.delete(`/attribute/${id}`, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  UpdateAttribute: async (id, data) => {
    try {
      const res = await API.put(`/attribute/${id}`, data, {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
