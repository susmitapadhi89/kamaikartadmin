import { API } from "../../../Axios";

export const OfferBannerService = {
  // Create new banner
  AddOfferBanner: async (data) => {
    try {
      const res = await API.post("/offer", data, {
        withCredentials: true,
      });
      console.log(res.data);

      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all banners
  GetOfferBanner: async () => {
    try {
      const res = await API.get("/offer", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete banner
  DeleteOfferBanner: async (id) => {
    try {
      const res = await API.delete(`/offer/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
