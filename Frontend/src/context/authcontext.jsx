import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-app-current-user")) || null
  );
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, searchQuery, setSearchQuery }}
    >
      {children}
    </AuthContext.Provider>
  );
};
