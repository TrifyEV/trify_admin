import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthConsumer from "./AuthProvider";
import Navbar from "./Navbar";

export const ProtectedRoute = () => {
  const auth = AuthConsumer();
  const location = useLocation();

  if (!auth?.token) {
    let loginUrl = "";
    if (location.pathname == "/") {
      loginUrl = "/trify_admin/login";
    } else {
      loginUrl = `/trify_admin/login?redirectUrl=${location.pathname}`;
    }
    return <Navigate to={loginUrl} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export const PublicRoutes = () => {
  const auth = AuthConsumer();
  return auth?.token ? (
    <div>
      <Navigate to="/trify_admin/" />
    </div>
  ) : (
    <div>
      <Outlet />
    </div>
  );
};
