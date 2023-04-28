import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { autoLogout } from "../features/authSlice";

const AppLogout = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogout(null));
  }, [auth.token]);

  return children;
};

export default AppLogout;
