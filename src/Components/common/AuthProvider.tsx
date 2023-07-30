import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCookie } from "./hooks/useCookie";

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
  const cookies = useCookie();
  const [token, setToken] = React.useState<string | null>(cookies.get("token"));
  const navigate = useNavigate();
  const signin = ({ newtoken, redirectUrl }: ISignInRequest) => {
    const origin = redirectUrl || "/";
    cookies.set("token", newtoken);
    setToken(newtoken);
    navigate(origin);
  };

  const signout = () => {
    setToken(null);
    cookies.set("token", "", new Date().toUTCString());
    cookies.set("user", "", new Date().toUTCString());
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
