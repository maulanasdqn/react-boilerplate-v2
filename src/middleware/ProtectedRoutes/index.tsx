import useAuth from "@hooks/Auth/useAuth";
import ApiService from "@services/Api";
import { FC, ReactElement, Fragment } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { PropsTypes } from "./types";

export const ProtectedRoutes: FC<PropsTypes> = ({ children }): ReactElement => {
  const isAuth = useAuth();
  const location = useLocation();

  if (!isAuth) {
    ApiService.removeHeader();
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return <Fragment>{children}</Fragment>;
  }
};

export const PublicRoutes: FC<PropsTypes> = ({ children }): ReactElement => {
  const isAuth = useAuth();
  const location = useLocation();

  if (isAuth) {
    return <Navigate to="/sales" state={{ from: location }} replace />;
  } else {
    return <Fragment>{children}</Fragment>;
  }
};
