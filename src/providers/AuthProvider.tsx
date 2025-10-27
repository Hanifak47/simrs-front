import { useState, useEffect } from "react";
import { AuthProviderProps, User } from "../types/types";
import { authService } from "../api/authService";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();  
  const navigate = useNavigate();

  useEffect(() => {

     
    if (location.pathname === "/customer/register" || location.pathname === "/admin/login" || location.pathname === "/" || location.pathname === "/customer/login") {
      setLoading(false);
      return;
    }
    
    const initializeUser = async () => { 

      try {
        const userData = await authService.fetchUser();
        if (userData) { 
          setUser(userData);
        } else {
          setUser(null); 
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);  
      }
      finally {
        setLoading(false);
      }

    };

    initializeUser();
  }, [location]);

  const login = async (email: string, password: string) => {
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null); 
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
