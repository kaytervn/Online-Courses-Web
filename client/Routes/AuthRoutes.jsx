import { useContext } from "react";
import { UserContext } from "../src/contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Role from "../../server/models/RoleEnum";

const AuthRoutes = () => {
  const { user } = useContext(UserContext);

  return user.token && user.role == Role.STUDENT ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoutes;
