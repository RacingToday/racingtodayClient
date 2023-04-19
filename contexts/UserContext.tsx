import { createContext, useState, useContext } from "react";

const UserContext = createContext<{
  userDetails: any;
  setUserDetails: (value: any) => void;
}>({
  userDetails: null,
  setUserDetails: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: any) => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
