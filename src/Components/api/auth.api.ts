import instance from "./axiosInstance";
import API_CONSTANTS from "./constants";

export type LoginResponse = {
  access: string;
  refresh: string;
};

export const loginUser = (data: { username: string; password: string }) =>
  instance.post<LoginResponse>(API_CONSTANTS.LOGIN, data);
