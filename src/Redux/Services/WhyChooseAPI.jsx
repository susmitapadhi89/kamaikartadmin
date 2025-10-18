import { API } from "../../../Axios";

export const WHyChooseService = {
  // GetAllWhyChoose
  GetAllWhyChoose: async () => {
    try {
      const res = await API.get("/whyChoose", {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  AddWhyChoosedata: async (data) => {
    try {
      const res = await API.post("/whyChoose", data, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  // DELETE section
  DeleteWhyChoose: async (id) => {
    try {
      const res = await API.delete(`/whyChoose/${id}`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // UPDATE section
  UpdateWhyChoose: async (id, data) => {
    try {
      const res = await API.put(`/whyChoose/${id}`, data, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
