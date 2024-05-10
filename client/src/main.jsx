import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "./contexts/UserContext.jsx";
import UsersProvider from "./contexts/UsersContext.jsx";
import MyCreatedCoursesProvider from "./contexts/MyCreatedCoursesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyCreatedCoursesProvider>
      <UsersProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </UsersProvider>
    </MyCreatedCoursesProvider>
  </React.StrictMode>
);
