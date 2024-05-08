import { useContext } from "react";
import { UserContext } from "../src/contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Role from "../../server/models/RoleEnum";

const InstructorRoutes = () => {
  const { user } = useContext(UserContext);

  return user.role == Role.INSTRUCTOR ? <Outlet /> : <Navigate to="/" />;
};

export default InstructorRoutes;
