const API_CONSTANTS = {
  LOGIN: "/api/token/",
  GET_VEHICALE_JOURNEY:
    "/api/admin/vehicle_journey?vehicle_id={vehicle_id}&start_date={start_date}&end_date={end_date}",
};

export const COOKIE_CONSTANTS = {
  TOKEN: "token",
  REFRESH_TOKEN: "refreshToken",
  REDIRECT_URL: "redirectUrl",
};

export default API_CONSTANTS;
