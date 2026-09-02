import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const initialAuthUser = (() => {
    try {
      const storedUser = localStorage.getItem("Users");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  })();

  const [authUser, setAuthUser] = useState(initialAuthUser);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
