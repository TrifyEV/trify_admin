import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { clearCookie, getCookieValue, setCookie } from "./authUtils";
import { COOKIE_CONSTANTS } from "./constants";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = getCookieValue(COOKIE_CONSTANTS.TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
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
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = getCookieValue(COOKIE_CONSTANTS.REFRESH_TOKEN);
      if (refreshToken) {
        try {
          const newTokenResponse = await axiosInstance.post<{
            access: string;
          }>("/api/token/refresh/", {
            refresh: refreshToken,
          });

          const newAccessToken = newTokenResponse.data.access;
          setCookie(COOKIE_CONSTANTS.TOKEN, newAccessToken);
          if (error.config) {
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axios(error.config);
          }
        } catch (refreshError) {
          clearCookie(COOKIE_CONSTANTS.TOKEN);
          window.location.href = "/";
        }
      } else {
        clearCookie(COOKIE_CONSTANTS.TOKEN);
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
