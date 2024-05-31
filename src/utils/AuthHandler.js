import { jwtDecode } from "jwt-decode";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
function UnauthenticatedRoute() {
  let auth = useAuth();

  // return !auth.isLogin ? <Outlet /> : <Navigate to="/" replace />;
  if (auth.isLogin) {
    let decoded = jwtDecode(auth.token ?? "");
    if (decoded.admin) {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/signin" replace />;
  } else {
    return <Outlet />;
  }
}

function AuthenticatedRoute() {
  let auth = useAuth();
  if (auth.isLogin) {
    let decoded = jwtDecode(auth.token ?? "");
    if (auth.isLogin && !decoded.admin) {
      return <Outlet />;
    } else {
      return <Navigate to="/admin" replace />;
    }
  } else {
    return <Navigate to="/signin" replace />;
  }
}

function IsAdmin() {
  let auth = useAuth();
  if (auth.isLogin) {
    let decoded = jwtDecode(auth.token ?? "");
    if (auth.isLogin && decoded.admin) {
      return <Outlet />;
    } else {
      return <Navigate to="/" replace />;
    }
  } else {
    return <Navigate to="/signin" replace />;
  }
}

export { UnauthenticatedRoute, AuthenticatedRoute, IsAdmin };
