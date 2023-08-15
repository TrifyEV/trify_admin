import instance from "./axiosInstance";

export type LoginResponse = {
  access: string;
  refresh: string;
};

export const loginUser = (data: { username: string; password: string }) =>
  instance.post<LoginResponse>("/api/token/", data);
