import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ProtectedRouteProps } from "../types/types";


const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {

    if (loading) return;
    if (!user) {
      navigate("/", { replace: true });
      // } else if (roles && !user.roles?.some((role) => roles.includes(role))) {

    } else if (roles && !user.roles?.some((role) => roles.includes(role as string))) {

      navigate("/unauthorized", { replace: true });
    }
  }, [user, roles, loading, navigate]);


  // if (loading || !user || (roles && !user.roles?.some((role) => roles.includes(role)))) {


  if (loading || !user || (roles && !user.roles?.some((role) => roles.includes(role as string)))) {
    return null;
  }

  return children;
};

export default ProtectedRoute;