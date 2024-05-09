import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/users/Login";
import ForgotPassword from "./pages/users/ForgotPassword";
import HomePage from "./pages/users/HomePage";
import ResetPassword from "./pages/users/ResetPassword";

import NotFoundPage from "./pages/NotFoundPage";
import GuestRoutes from "../Routes/GuestRoutes";
import AuthRoutes from "../Routes/AuthRoutes";
import Register from "./pages/users/Register";
import AdminRoutes from "../Routes/AdminRoutes";
import UserManager from "./pages/admin/UserManager";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import Role from "../../server/models/RoleEnum";
import { getUser } from "./services/usersService";
import CreatedCourses from "./pages/instructors/CreatedCoursesLayout";
import InstructorRoutes from "../Routes/InstructorRoutes";
import Loading from "./pages/Loading";
import StudentRoutes from "../Routes/StudentRoutes";

const App = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user.role);
  console.log(user.token);
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
          {user.role === Role.ADMIN && (
            <Route index element={<UserManager />} />
          )}
          {user.role === Role.INSTRUCTOR && (
            <Route index element={<CreatedCourses />} />
          )}
          {user.role !== Role.ADMIN && user.role !== Role.INSTRUCTOR && (
            <Route index element={<HomePage />} />
          )}
          <Route element={<AuthRoutes />}>
            <Route element={<AdminRoutes />}>
              {/* <Route path="/course-manager" element={<CourseManager />}></Route> */}
            </Route>
            <Route element={<InstructorRoutes />}>
              {/* <Route path="/create-course" element={<CreatedCourses />}></Route> */}
            </Route>
            <Route element={<StudentRoutes />}>
              {/* <Route path="/cart" element={<CreateCourse />}></Route> */}
            </Route>
          </Route>
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

// const App = () => {
//   const user = userAuthentication();

//   return (
//     <BrowserRouter>
//       <div>
//         {/* <HomePage user={user} /> */}
//         <Routes>
//           <Route path="/" element={<Layout />} />
//           <Route
//             path="/login"
//             element={user ? <Navigate to="/homepage" /> : <Login />}
//           />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//         </Routes>
//       </div>
//     </BrowserRouter >
//   )
// }

//   if (user) {
//     return (
//       <BrowserRouter>
//         <HomePage user={user} />
//         <Routes>
//           <Route path="/" element={<Layout />} />
//           <Route
//             path="/login"
//             element={user ? <Navigate to="/homepage" /> : <Login />}
//           />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//         </Routes>
//       </BrowserRouter >
//     )
//   }
//   else {
//     return (
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Layout />} />
//           <Route
//             path="/login" element={<Login />}
//           />
//           <Route path="/homepage" element={<HomePage />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//         </Routes>
//       </BrowserRouter >
//     )

//   }
// }


export default App;
