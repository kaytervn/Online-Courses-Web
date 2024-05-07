// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Layout from "./pages/Layout";
import Login from "./pages/users/Login";

import ForgotPassword from "./pages/users/ForgotPassword";
import HomePage from "./pages/users/HomePage";
import ResetPassword from "./pages/users/ResetPassword";
import userAuthentication from "./Components/customhook/userAuthentication";

function App() {
  const user = userAuthentication();

  if (user) {
    return (
      <BrowserRouter>
        <div>
          <HomePage user={user} />
          <Routes>
            {/* <Route path="/" element={<Layout />} /> */}
            <Route
              path="/login"
              element={user ? <Navigate to="/homepage" /> : <Login />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
