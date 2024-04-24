import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
function UnauthenticatedRoute() {
  let auth = useAuth();

  return !auth.isLogin ? <Outlet /> : <Navigate to="/" replace />;
}

function AuthenticatedRoute() {
  let auth = useAuth();
  return auth.isLogin ? <Outlet /> : <Navigate to="/signin" replace />;
}

export { UnauthenticatedRoute, AuthenticatedRoute };
