import { createContext, useState, useEffect } from "react";

export const CardContext = createContext({});

const CartProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    //получение все товаров из корзины
  });
  return (
    <CardContext.Provider
      value={{
        basket,
        setBasket,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CartProvider;
