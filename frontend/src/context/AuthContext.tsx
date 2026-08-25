import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types";
import { getMeRequest, loginRequest, registerRequest, type RegisterPayload } from "../api/auth";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("rexchange_token");
    if (!token) {
      setLoading(false);
      return;
    }
    getMeRequest()
      .then((res) => setUser(res.user))
      .catch(() => localStorage.removeItem("rexchange_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await loginRequest({ email, password });
    localStorage.setItem("rexchange_token", res.token);
    setUser(res.user);
  };

  const register = async (data: RegisterPayload) => {
    const res = await registerRequest(data);
    localStorage.setItem("rexchange_token", res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem("rexchange_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
