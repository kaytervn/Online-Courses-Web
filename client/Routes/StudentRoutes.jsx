import { useContext } from "react";
import { UserContext } from "../src/contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import Role from "../../server/models/RoleEnum.js";

const StudentRoutes = () => {
  const { user } = useContext(UserContext);

  return user.role == Role.STUDENT ? <Outlet /> : <Navigate to="/" />;
};

export default StudentRoutes;
