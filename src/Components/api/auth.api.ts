import axiosInstance from "./axiosInstance";

export type LoginResponse = {
  access: string;
  refresh: string;
};

export type LoginUserRequestType = {
  username: string;
  password: string;
};

export const loginUser = (data: LoginUserRequestType) =>
  axiosInstance.post<LoginResponse>("/api/token/", data);
