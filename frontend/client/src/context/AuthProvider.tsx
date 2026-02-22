import { useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 1. ADIM: Token için bir State kutusu açıyoruz (Piller buraya!)
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token"); // Sayfa yenilense de kimlik kaybolmasın
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser || savedUser === "undefined") return null;
    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("User parse hatası:", error);
      return null;
    }
  });

  // 2. ADIM: Login fonksiyonunda Token'ı hem hafızaya hem State'e alıyoruz
  const login = (newToken: string, userData: User) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken); // İşte burası kritik!
    setCurrentUser(userData);
  };

  // 3. ADIM: Logout olunca her yeri tertemiz yapıyoruz
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setCurrentUser(null);
  };

  return (
    // Artık 'token' burada kırmızı yanmaz çünkü yukarıda tanımladık!
    <AuthContext.Provider value={{ currentUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
