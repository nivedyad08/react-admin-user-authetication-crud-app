import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const isAuth = Cookies.get("token");
  const curr = window.location.pathname;
  const isLoginPage = curr === "/login";
  const isSignupPage = curr === "/signup";

  if (isAuth && (isLoginPage || isSignupPage)) {
    return <Navigate to="/" />;
  } else if (!isAuth && !isLoginPage && !isSignupPage) {
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
}

export default ProtectedRoutes;
