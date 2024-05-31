// import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";
import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useAxiosPrivate = () => {
  //   const refresh = useRefreshToken();
  const { token: auth, login } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        console.log(error);
        if (!error?.response) {
          return Promise.reject(error);
        }
        if (error?.response.status === 401 && error?.response?.data?.ErrCode === "1278ca") {
          prevRequest.sent = true;
          const newAccessToken = await axiosPrivate.get("/refresh-token");
          login(newAccessToken?.data?.accessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken?.data?.accessToken}`;
          return axiosPrivate.request(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, login]);

  return axiosPrivate;
};

export default useAxiosPrivate;
