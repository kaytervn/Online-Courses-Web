import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/users/Login";
import ForgotPassword from "./pages/users/ForgotPassword";
import HomePage from "./pages/users/HomePage";
import MyProfilePage from "./pages/users/MyProfilePage/MyProfilePage";
import ResetPassword from "./pages/users/ResetPassword";
import NotFoundPage from "./pages/NotFoundPage";
import GuestRoutes from "../Routes/GuestRoutes";
import Register from "./pages/users/Register";
import UserManager from "./pages/admin/UserManager";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Role from "../../server/models/RoleEnum";
import { getUser } from "./services/usersService";
import CreatedCourses from "./pages/instructors/CreatedCoursesLayout";
import Loading from "./pages/Loading";
import CreateCourse from "./pages/instructors/CreateCourse";
import CartPage from "./pages/students/CartPage";
import PersonalRevenue from "./pages/instructors/PersonalRevenue";
import InstructorManager from "./pages/admin/InstructorManager";
import CoursePage from "./pages/students/CoursePage";

import CourseManager from "./pages/admin/CourseManager";

import CourseIntro from "./pages/instructors/CourseIntro";


const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    }, 0);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!user.token ||
          (loading && !user.role && <Route index element={<Loading />} />)}
        <Route element={<Layout />}>
          {user.role == Role.ADMIN && (
            <>
              <Route index element={<UserManager />} />
              <Route path="/instructor" element={<InstructorManager />} />
              <Route path="/course" element={<CourseManager />} />
              {/* <Route path="/course-manager" element={<CourseManager />}></Route> */}
            </>
          )}
          {user.role == Role.INSTRUCTOR && (
            <>
              <Route index element={<CreatedCourses />} />
              <Route path="/create-course" element={<CreateCourse />}></Route>
              <Route path="/course-intro" element={<CourseIntro />}></Route>
              <Route
                path="/personal-revenue"
                element={<PersonalRevenue />}
              ></Route>
            </>
          )}
          {user.role != Role.ADMIN && user.role != Role.INSTRUCTOR && (
            <>
              <Route index element={<HomePage />} />
              <Route path="/list-courses" element={<CoursePage />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
            </>
          )}
          {user.token && (
            <>
              <Route path="/my-profile" element={<MyProfilePage />}></Route>
            </>
          )}
          <Route element={<GuestRoutes />}>
            <Route path="/list-courses" element={<CoursePage />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />
          </Route>
          {!loading && <Route path="*" element={<NotFoundPage />} />}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
