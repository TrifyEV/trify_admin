type Cookies = typeof URLSearchParams.prototype & {
  set: (key: string, value: string, expiry: string) => void;
};

const checkCookie = (function () {
  let lastCookie = document.cookie; // 'static' memory between function calls

  return function (cb: () => void) {
    const currentCookie = document.cookie;

    if (currentCookie != lastCookie) {
      // something useful like parse cookie, run a callback fn, etc.
      if (cb) {
        cb();
      }
      lastCookie = currentCookie; // store latest cookie
    }
  };
})();
export const getCookie = (): Cookies & {
  onChange: (cb: () => void) => void;
} => {
  const cookies = new URLSearchParams(
    document.cookie.replaceAll("&", "%26").replaceAll("; ", "&")
  );
  const cookie = cookies as unknown as Cookies & {
    onChange: (cb: () => void) => void;
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cookie.set = (key: string, value: string, expiry: string, path = "/") => {
    const date = new Date(expiry).toUTCString();
    document.cookie = `${key}=${value}; expires=${date}; path=${path}`;
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  cookies.onChange = (cb) => {
    if (cb) {
      setInterval(() => checkCookie(cb), 10000);
    }
  };
  return cookie;
};

export const useCookie = (): Cookies & {
  onChange: (cb: () => void) => void;
} => {
  return getCookie();
};
