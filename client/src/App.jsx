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
const App = () => {
  const { user, setUser } = useContext(UserContext);
  // useEffect(() => {
  //   setTimeout(async () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const data = await getUser(token);
  //       setUser({
  //         token,
  //         email: data.user.email,
  //         name: data.user.name,
  //         picture: data.user.picture,
  //         role: data.user.role,
  //       });
  //     }
  //   }, 0);
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        {user.role === Role.ADMIN && (
          <Route element={<AdminLayout />}>
            <Route element={<AdminRoutes />}>
              <Route index element={<UserManager />} />
            </Route>
          </Route>
        )}

        {user.role === Role.INSTRUCTOR && (
          <Route element={<AdminLayout />}>
            <Route element={<AdminRoutes />}>
              <Route index element={<UserManager />} />
            </Route>
          </Route>
        )}

        {/* GUEST, STUDENT */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
