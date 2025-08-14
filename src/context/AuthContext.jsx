import { createContext, useEffect, useState } from "react";
import * as auth from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken]   = useState(localStorage.getItem("token") || null);
  const [user, setUser]     = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Keep localStorage in sync
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { token: t, user: u } = await auth.login(email, password);
      setToken(t);
      setUser(u);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      await auth.register(name, email, password);
      return await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
