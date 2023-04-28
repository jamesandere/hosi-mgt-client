import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AppLogout from "./AppLogout";

const RequireAuth = () => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  return auth.token !== "" ? (
    <AppLogout>
      <Outlet />
    </AppLogout>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
