import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItem, setCartitem] = useState({
    token: localStorage.getItem("token"),
    
  });

  return (
    <CartContext.Provider value={{ cartItem, setCartitem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
