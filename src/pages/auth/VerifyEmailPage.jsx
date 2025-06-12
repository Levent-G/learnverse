import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { notify } from "../../utils/notify";
import Page from "../../components/page/Page";

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
      <Page title="Hata">
        <p>
          Hesabınız aktifleştirildi. Giriş sayfasına yönlendiriliyorsunuz...
        </p>
      </Page>
    );
  if (status === "error")
    return (
      <Page title="Hata">
        <p>Geçersiz veya süresi dolmuş doğrulama linki.</p>
      </Page>
    );

  return null;
}
