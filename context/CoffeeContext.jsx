import { createContext, useState } from "react";

export const CoffeeContext = createContext();

function CoffeeProvider({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <CoffeeContext.Provider value={{ cart, setCart }}>
      {children}
    </CoffeeContext.Provider>
  );
}

export default CoffeeProvider;