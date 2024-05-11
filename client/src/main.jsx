import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "./contexts/UserContext.jsx";
import UsersProvider from "./contexts/UsersContext.jsx";
import CartProvider from "./contexts/CartContext.jsx";
import CoursesProvider from "./contexts/CoursesContext.jsx";
import NotificationProvider from "./contexts/NotificationContext .jsx";
import StatisticsProvider from "./contexts/StatisticsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StatisticsProvider>
      <CartProvider>
        <NotificationProvider>
          <CoursesProvider>
            <UsersProvider>
              <UserProvider>
                <App />
              </UserProvider>
            </UsersProvider>
          </CoursesProvider>
        </NotificationProvider>
      </CartProvider>
    </StatisticsProvider>
  </React.StrictMode>
);
