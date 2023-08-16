export const getCookieValue = (cookieName: string) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

export const setCookie = (
  name: string,
  value: string,
  daysToExpire: number = 1
) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieValue =
    encodeURIComponent(value) +
    (daysToExpire ? `; expires=${expirationDate.toUTCString()}` : "");

  document.cookie = `${name}=${cookieValue}; path=/`;
};

export const clearCookie = (name: string) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() - 1);
  const cookieValue = encodeURIComponent("");
  document.cookie = `${name}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/`;
};
