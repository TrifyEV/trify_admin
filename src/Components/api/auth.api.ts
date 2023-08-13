import { doPost } from ".";
import API_CONSTANTS from "./constants";

export type LoginResponse = {
  access: string;
  refresh: string;
};

export const loginUser = (data: { username: string; password: string }) =>
  doPost<LoginResponse>(
    API_CONSTANTS.LOGIN,
    {},
    { body: JSON.stringify(data) }
  );
