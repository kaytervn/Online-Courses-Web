import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/users/Login";
import ForgotPassword from "./pages/users/ForgotPassword";
import HomePage from "./pages/users/HomePage";
import ResetPassword from "./pages/users/ResetPassword";
import userAuthentication from "./Components/customhook/userAuthentication";
import NotFoundPage from "./pages/NotFoundPage";
import GuestRoutes from "../Routes/GuestRoutes";
import AuthRoutes from "../Routes/AuthRoutes";
import Register from "./pages/users/Register";
import AdminRoutes from "../Routes/AdminRoutes";
import AdminLayout from "./pages/admin/AdminLayout";
import UserManager from "./pages/admin/UserManager";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/UserContext";
import Role from "../../server/models/RoleEnum";
import { getUser } from "./services/usersService";
import CreatedCourses from "./pages/instructors/CreatedCoursesLayout";
import InstructorRoutes from "../Routes/InstructorRoutes";
import Loading from "./pages/Loading";
const App = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setTimeout(async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const dataUser = await getUser(token);
        setUser({
          token,
          email: dataUser.email,
          name: dataUser.name,
          picture: dataUser.picture,
          role: dataUser.role,
        });
      }
    }, 0);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {user.role === Role.ADMIN && (
            <Route index element={<UserManager />} />
          )}
          {user.role === Role.INSTRUCTOR && (
            <Route index element={<CreatedCourses />} />
          )}
          {user.role !== Role.ADMIN && user.role !== Role.INSTRUCTOR && (
            <Route index element={<HomePage />} />
          )}
          <Route element={<AuthRoutes />}></Route>
          <Route element={<GuestRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
