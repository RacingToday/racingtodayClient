import { createContext, useState, useContext } from "react";

const loginContext = createContext<{
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}>({
  loggedIn: false,
  setLoggedIn: (value: boolean) => {},
});

export const useLogin = () => {
  return useContext(loginContext);
};

export const LoginProvider = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <loginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </loginContext.Provider>
  );
};
