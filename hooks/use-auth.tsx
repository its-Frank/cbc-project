"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
} | null;

type AuthContextType = {
  user: User;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize with null
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // First try to get user from localStorage
        if (typeof window !== "undefined") {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              setUser(parsedUser);
            } catch (e) {
              console.error("Error parsing stored user:", e);
              localStorage.removeItem("user");
            }
          }
        }

        // Then verify with API
        const response = await fetch(`/api/auth/me`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(data.user));
          }
        } else {
          // If API says not authenticated, clear local storage
          if (typeof window !== "undefined") {
            localStorage.removeItem("user");
          }
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // Keep any user from localStorage on error
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    if (userData && typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch(`/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      // Clear user from state and localStorage
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
