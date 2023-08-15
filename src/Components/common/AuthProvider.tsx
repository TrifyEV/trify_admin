import * as React from "react";
import { useNavigate } from "react-router-dom";
import { clearCookie, getCookieValue, setCookie } from "../api/authUtils";
import { COOKIE_CONSTANTS } from "../api/constants";

interface ISignInRequest {
  newtoken: string;
  refresh?: string;
  redirectUrl?: string;
}

interface IAuthData {
  token?: string | null;
  signin: (arg0: ISignInRequest) => void;
  signout: () => void;
}

const AuthContext = React.createContext<IAuthData | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(
    getCookieValue(COOKIE_CONSTANTS.TOKEN)
  );
  const navigate = useNavigate();
  const signin = ({ newtoken, refresh, redirectUrl }: ISignInRequest) => {
    const origin = redirectUrl || "/";
    setCookie(COOKIE_CONSTANTS.TOKEN, newtoken);
    setCookie(COOKIE_CONSTANTS.REFRESH_TOKEN, refresh || "");
    setToken(newtoken);
    navigate(origin);
  };
  const signout = () => {
    setToken(null);
    clearCookie(COOKIE_CONSTANTS.TOKEN);
    navigate("/login");
  };

  const value: IAuthData = { token, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(AuthContext);
}

export { AuthConsumer as useAuth };
export { AuthProvider };
