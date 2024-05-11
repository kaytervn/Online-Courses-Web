import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "./contexts/UserContext.jsx";
import UsersProvider from "./contexts/UsersContext.jsx";
import CartProvider from "./contexts/CartContext.jsx";
import CoursesProvider from "./contexts/CoursesContext.jsx";
import StatisticsProvider from "./contexts/StatisticsContext.jsx";
import UserDetail from "./pages/admin/UserDetail.jsx";
import UserDetailProvider from "./contexts/UserDetailContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StatisticsProvider>
      <UserDetailProvider>
        <CoursesProvider>
          <CartProvider>
            <CoursesProvider>
              <UsersProvider>
                <UserProvider>
                  <App />
                </UserProvider>
              </UsersProvider>
            </CoursesProvider>
          </CartProvider>
        </CoursesProvider>
      </UserDetailProvider>
    </StatisticsProvider>
  </React.StrictMode>
);
