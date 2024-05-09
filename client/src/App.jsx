import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/users/Login";
import ForgotPassword from "./pages/users/ForgotPassword";
import HomePage from "./pages/users/HomePage";
import ResetPassword from "./pages/users/ResetPassword";
// import userAuthentication from "./Components/customhook/userAuthentication";
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
  console.log(user.role);
  console.log(user.token);

  useEffect(() => {
    setTimeout(async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await getUser(token);
        setUser({
          token,
          email: data.user.email,
          name: data.user.name,
          picture: data.user.picture,
          role: data.user.role,
        });
      }
    }, 0);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* {user.role === Role.ADMIN && (
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminRoutes />}>
              <Route index element={<UserManager />} />
            </Route>
          </Route>
        )}

        {user.role === Role.INSTRUCTOR && (
          <Route element={<AdminLayout />}>
            <Route element={<AdminRoutes />}>
              <Route path="/instructor" element={<CreatedCourses />} />
            </Route>
          </Route>
        )} */}

        {/* GUEST, STUDENT */}
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route element={<AuthRoutes />}></Route>
          {user.role === Role.ADMIN ? (
            <Route path="/admin" element={<AdminRoutes />}>
              <Route index element={<UserManager />} />
            </Route>
          ) : user.role === Role.INSTRUCTOR ? (
            <Route path="/instructor" element={<InstructorRoutes />}>
              <Route index element={<CreatedCourses />} />
            </Route>
          ) : (
            <Route element={<GuestRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/reset-password/:id/:token"
                element={<ResetPassword />}
              />
            </Route>
          )}
        </Route>
        <Route path="/admin" element={<Loading />} />
        <Route path="/instructor" element={<Loading />} />
        <Route path="*" element={<NotFoundPage />} />
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
