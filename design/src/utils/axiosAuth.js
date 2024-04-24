import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Setup request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Add any specific logic before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Setup response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    console.log(error);
    if (
      error?.response.status === 401 &&
      error?.response?.data?.ErrCode === "1278ca"
    ) {
      prevRequest.sent = true;
      const newAccessToken = await axiosInstance.get("/refresh-token");
      console.log("here");
      console.log("new accesss token", newAccessToken);
      prevRequest.headers[
        "Authorization"
      ] = `Bearer ${newAccessToken?.data?.accessToken}`;
      return axiosInstance.request(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
