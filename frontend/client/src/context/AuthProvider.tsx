import { useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");

    // Güvenlik kontrolü: Veri yoksa veya 'undefined' ise null dön
    if (!savedUser || savedUser === "undefined") return null;

    // EKSİK OLAN KISIM BURASIYDI: Veriyi JSON olarak geri döndürmeliyiz
    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("User parse hatası:", error);
      return null;
    }
  });

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
