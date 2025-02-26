import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

/* Could be also a High Order Function/Component */
export const PrivateRoute = ({ children, redirectTo }) => {
  const { user } = useUser();

  if (user === null) return <Navigate to={redirectTo} replace />;

  return children ? children : <Outlet />;
};
