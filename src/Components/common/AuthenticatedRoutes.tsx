import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthConsumer from "./AuthProvider";

export const ProtectedRoute = () => {
  const auth = AuthConsumer();
  const location = useLocation();

  if (!auth?.token) {
    let loginUrl = "";
    if (location.pathname == "/") {
      loginUrl = "/login";
    } else {
      loginUrl = `/login?redirectUrl=${location.pathname}`;
    }
    return <Navigate to={loginUrl} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export const PublicRoutes = () => {
  const auth = AuthConsumer();
  return auth?.token ? <Navigate to="/" /> : <Outlet />;
};
