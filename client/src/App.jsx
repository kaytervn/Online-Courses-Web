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
import UpdateCourseIntro from "./pages/instructors/UpdateCourseIntro";
import EditProfile from "./pages/users/MyProfilePage/EditProfile";
import CourseManager from "./pages/admin/CourseManager";
import CourseIntro from "./pages/instructors/CourseIntro";
import RevenueStatistic from "./pages/admin/RevenueStatistic";
import EditCourseIntro from "./pages/instructors/EditCourseIntro";
import CheckoutPage from "./pages/students/CheckoutPage";
import MyCoursePage from "./pages/students/MyCoursePage";

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
          phone: dataUser.phone,
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
              <Route path="/statistics" element={<RevenueStatistic />} />
              {/* <Route path="/course-manager" element={<CourseManager />}></Route> */}
            </>
          )}
          {user.role == Role.INSTRUCTOR && (
            <>
              <Route index element={<CreatedCourses />} />
              <Route path="/create-course" element={<CreateCourse />}></Route>
              <Route
                path="/update-course-intro"
                element={<UpdateCourseIntro />}
              ></Route>
              <Route
                path="/personal-revenue"
                element={<PersonalRevenue />}
              ></Route>
              <Route
                path="/edit-course-intro"
                element={<EditCourseIntro />}
              ></Route>
            </>
          )}
          {user.role != Role.ADMIN && user.role != Role.INSTRUCTOR && (
            <>
              <Route index element={<HomePage />} />
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="/list-courses" element={<CoursePage />}></Route>
              <Route path="/checkout" element={<CheckoutPage />}></Route>
              <Route path="/my-course" element={<MyCoursePage />}></Route>
            </>
          )}
          {user.token && (
            <>
              <Route path="/my-profile" element={<MyProfilePage />}></Route>
              <Route path="/my-profile/edit" element={<EditProfile />}></Route>
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
