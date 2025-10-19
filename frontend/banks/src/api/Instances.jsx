import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: process.env.API_BASE_URL || 'http://localhost:4000/vkyc/api/v1',
  baseURL: "http://localhost:8000/",
  // process.env.API_BASE_URL || "https://vkyc-uat-bds.payfi.co.in/vkyc/api/v1",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (config.headers) {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token.replace(/"/g, "")}`;
        } else {
          config.headers["Authorization"] = "";
        }

        config.headers["Timezone"] = timeZone;
        config.headers["deviceType"] = "web";

        if (config.headers["Content-Type"] === "multipart/form-data") {
          console.log("Processing multipart/form-data");
        } else if (!config.headers["Content-Type"]) {
          config.headers["Content-Type"] = "application/json";
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (typeof window !== "undefined") {
      // Handle 401 errors in the browser
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("persist:root");

        // // Redirect to the homepage on 401 Unauthorized

        setTimeout(() => {
          window.location.replace("/");
        }, [2000]);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
