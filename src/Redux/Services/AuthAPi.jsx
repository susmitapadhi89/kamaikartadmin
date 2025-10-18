import { API } from "../../../Axios";

export const AuthServices = {
  // Add
  Login: async (data) => {
    try {
      const res = await API.post("/admin/login", data, {
        credentials: "include",
      });
      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  //Logout

  Logout: async () => {
    try {
      const res = await API.post("/admin/logout", {
        withCredentials: true,
      });

      return res;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
