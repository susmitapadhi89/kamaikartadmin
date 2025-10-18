import { API } from "../../../Axios";

export const RoleServices = {
  // GetAllRolevalue
  GetAllRole: async () => {
    try {
      const res = await API.get("/roles/get");

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
