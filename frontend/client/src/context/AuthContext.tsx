import { createContext, useContext } from "react";
import type { User } from "../types/User";

// 1. Context tipi
export interface AuthContextType {
  currentUser: User | null;
  // Dikkat: Login fonksiyonun token ve kullanıcı datası bekliyor!
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// 2. Context'i oluşturuyoruz (Başlangıçta undefined olması TypeScript için en sağlıklısıdır)
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// 3. BONUS: useAuth Hook'u (Her bileşende context çağırma zahmetinden kurtarır)
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Eğer context bir provider dışında çağrılırsa paramedic refleksiyle hatayı yapıştırıyoruz!
  if (context === undefined) {
    throw new Error("You cannot use useAuth outside of AuthProvider!");
  }

  return context;
};
