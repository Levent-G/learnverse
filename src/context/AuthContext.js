import React, { createContext, useContext, useState } from "react";
import { useApiRequest } from "../hooks/useApiRequest";
import { useAutoLogout } from "../hooks/useAutoLogout";
import { useNavigate } from "react-router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem("userInfo");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const { request } = useApiRequest();

  const navigate = useNavigate();

  // 🔥 Otomatik çıkış aktifleşiyor
  useAutoLogout({setCurrentUser, navigate});

  const setUserInfo = async (email) => {
    const result = await request({
      url: "/user/getUserInfo",
      method: "GET",
      params: { email },
    });

    if (result.success) {
      const userInfo = { ...result.data };
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  };

  const login = async (email, password) => {
    setLoading(true);

    const result = await request({
      url: "/auth/login",
      method: "POST",
      body: { email, password },
    });

    if (!result.success) {
      setLoading(false);
      return { success: false, error: result.error || "Giriş hatası" };
    }

    const { token, active, ...userData } = result.data;

    if (!token) {
      setLoading(false);
      return { success: false, error: "Token alınamadı." };
    }

    if (!active) {
      setLoading(false);
      return {
        success: false,
        active: false,
        error: "Hesabınız aktif değil. Lütfen e-posta kutunuzu kontrol edin.",
      };
    }

    sessionStorage.setItem("authToken", token);
    await setUserInfo(email);
    setCurrentUser({ ...userData, token });

    setLoading(false);

    return { success: true };
  };

  const logout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userInfo");
    setCurrentUser(null);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
