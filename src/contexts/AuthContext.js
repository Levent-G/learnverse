import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8010/auth/login", {
        email,
        password,
      });

      const { token, active, ...userData } = response.data;

      if (!token) {
        throw new Error("Token alınamadı.");
      }

      if (!active) {
        return {
          success: false,
          active: false,
          error:
            "Hesabınız aktif değil. Lütfen e-posta kutunuzu kontrol edip doğrulama linkine tıklayın.",
        };
      }

      localStorage.setItem("authToken", token);

      setCurrentUser({
        ...userData,
        token,
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.messages?.[0]?.text ||
          "Giriş işlemi sırasında bir hata oluştu.",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("authToken");

      setCurrentUser(null);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.messages?.[0]?.text,
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
