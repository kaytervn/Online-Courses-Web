import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserProvider from "./contexts/UserContext.jsx";
import UsersProvider from "./contexts/UsersContext.jsx";
import CartProvider from "./contexts/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <UsersProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </UsersProvider>
    </CartProvider>
  </React.StrictMode>
);
