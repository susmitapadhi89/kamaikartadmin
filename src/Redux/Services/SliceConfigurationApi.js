import { API } from "../../../Axios";

export const SiteConfigurationSerivce = {
  GetSiteinfo: async () => {
    try {
      const res = await API.get("/generalSetting", { withCredentials: true });

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  UpdateSiteinfo: async (data) => {
    try {
      const res = await API.post("/generalSetting/save", data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
