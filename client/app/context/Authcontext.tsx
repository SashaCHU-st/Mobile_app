// app/context/Authcontext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) 
          setIsAuthorized(true);
      setLoading(false);
    });
  }, []);

  const login = async (token: string) => {
    await AsyncStorage.setItem("token", token);
    setIsAuthorized(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuthorized(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
