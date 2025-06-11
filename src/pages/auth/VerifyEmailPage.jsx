import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { notify } from "../../utils/notify";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    fetch(`http://localhost:8010/auth/verify?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          notify("Hesabınız başarıyla aktifleştirildi!", "success");

          // İstersen 3 saniye sonra login sayfasına yönlendir
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setStatus("error");
          notify(
            data.message || "Geçersiz veya süresi dolmuş doğrulama linki",
            "error"
          );
        }
      });
  }, [token, navigate]);

  if (status === "loading") return <p>Doğrulama yapılıyor...</p>;
  if (status === "success")
    return (
      <p>Hesabınız aktifleştirildi. Giriş sayfasına yönlendiriliyorsunuz...</p>
    );
  if (status === "error")
    return <p>Geçersiz veya süresi dolmuş doğrulama linki.</p>;

  return null;
}
