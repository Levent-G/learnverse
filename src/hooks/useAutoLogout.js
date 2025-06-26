import { useEffect } from "react";

export const useAutoLogout = ({ setCurrentUser, navigate, timeoutDuration = 15 * 60 * 1000 }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userInfo");
      setCurrentUser(null);
      navigate("/login");
      console.log("15 dakika doldu, otomatik çıkış yapıldı.");
    }, timeoutDuration);

    return () => clearTimeout(timeout);
  }, [setCurrentUser, navigate, timeoutDuration]);
};
