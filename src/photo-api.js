import axios from "axios";

const API_KEY = "2UmRgL5j3ULCr98GawBiTg0wAHZ-vmLHs1CHH1VhjHQ";

axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;

export const fetchPhotos = async (topic, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      query: topic,
      page,
      per_page: 12,
    },
  });
  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};
