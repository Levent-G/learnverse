import { useEffect } from "react";

export const useAutoLogout = (setCurrentUser) => {
  useEffect(() => {
    // 15 dakika sonra otomatik çıkış
    const timeout = setTimeout(() => {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userInfo");
      setCurrentUser(null);
      console.log("Otomatik olarak çıkış yapıldı");
    }, 15 * 60 * 1000); // 15 dakika

    return () => clearTimeout(timeout); // component unmount olursa iptal et
  }, [setCurrentUser]);
};
