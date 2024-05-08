import { useContext } from "react";
import { UserContext } from "../src/contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Role from "../../server/models/RoleEnum";

const AdminRoutes = () => {
  const { user } = useContext(UserContext);

  return user.role == Role.ADMIN ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminRoutes;
