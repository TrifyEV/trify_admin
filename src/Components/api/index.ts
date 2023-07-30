import { getCookie } from "../common/hooks/useCookie";
import ApiException from "./Api.exception";

export const replaceParamInString = (
  str: string,
  params: { [key: string]: any }
): string => {
  const regexReqParam = /[^{]+(?=})/g;
  const matches = str.match(regexReqParam) || [];
  let changedUrl = str;
  matches.forEach((match) => {
    const param = params[match] !== undefined ? params[match] : "";
    changedUrl = changedUrl.replace(`{${match}}`, param);
  });
  return changedUrl;
};

const headers = {};

const doCall = async (
  uri: string,
  params: { [key: string]: any },
  option: { [key: string]: any } = {
    headers: {},
  }
) => {
  const TOKEN = getCookie().get("token");
  const authHeader = {
    Authorization: `Bearer ${TOKEN}`,
    "content-type": "application/json",
  };
  const { isAbsUrl } = params;
  uri = replaceParamInString(uri, params);
  const url = isAbsUrl ? uri : import.meta.env.VITE_BACKEND_ENDPOINT + uri;
  const fetched = fetch(url, {
    ...option,
    headers: {
      ...headers,
      ...option.headers,
      ...authHeader,
    },
  });
  return fetched.then(async (response: Response) => {
    if (response.ok === false) {
      const res = await response.json();
      if (response.status === 401) {
        window.location.href = "/login";
        return {};
      }
      throw new ApiException(
        `${res?.message || response.statusText}`,
        response.status,
        res
      );
    } else {
      return response.json();
    }
  });
};

export const doGet = <T>(
  uri: string,
  params: object = {},
  options?: any
): Promise<T> => {
  return doCall(uri, params, options);
};

export const doPost = <T>(
  uri: string,
  params: object = {},
  options?: any
): Promise<T> => {
  return doCall(uri, params, { ...options, method: "POST" });
};

export const doPatch = <T>(
  uri: string,
  params: object = {},
  options?: any
): Promise<T> => {
  return doCall(uri, params, { ...options, method: "PATCH" });
};

export const doPut = <T>(
  uri: string,
  params: object = {},
  options?: any
): Promise<T> => {
  return doCall(uri, params, { ...options, method: "PUT" });
};

export const doDelete = <T>(
  uri: string,
  params: object = {},
  options?: any
): Promise<T> => {
  return doCall(uri, params, { ...options, method: "DELETE" });
};
