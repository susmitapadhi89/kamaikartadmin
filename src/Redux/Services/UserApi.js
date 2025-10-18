import { API } from "../../../Axios";

export const UserService = {
  // getseller
  GetUser: async ({ page, limit, filters } = {}) => {
    try {
      const res = await API.get("/user/", {
        params: { page, limit, ...filters }, // 🔹 query params
        withCredentials: true,
      });
      return res.data; // Expect: { sellers: [], total: number }
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  //GetUserById
  GetUserById: async (id) => {
    try {
      const res = await API.get(`/user/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  //UpdateUser
  UpdateUser: async (id, data) => {
    try {
      const res = await API.put(`/user/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // DeleteUser
  DeleteUser: async (id) => {
    try {
      const res = await API.delete(`/user/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
