import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Typography, CircularProgress } from "@mui/material";
import Page from "../../components/page/Page";
import CustomButton from "../../components/customButton/CustomButton";
import { notify } from "../../utils/notify";

export default function VerifyAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const hasRun = useRef(false); 

  useEffect(() => {
    if (hasRun.current) return; 
    hasRun.current = true;

    const token = searchParams.get("token");

    if (!token) {
      setStatus("❌ Geçersiz bağlantı.");
      setLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8010/auth/verify?token=${token}`
        );
        setStatus("✅ Hesabınız başarıyla aktifleştirildi.");
        notify(res.data || "Hesabınız aktifleştirildi.", "success");

        setTimeout(() => {
          navigate("/giris");
        }, 4000);
      } catch (err) {
        const message = err.response?.data?.message || "Doğrulama başarısız.";
        setStatus("❌ " + message);
        notify(message, "error");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <Page title="Hesap Doğrulama">
      <Box textAlign="center" mt={4}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              {status}
            </Typography>

            {!status?.includes("✅") && (
              <Box mt={3}>
                <CustomButton
                  onClick={() => navigate("/login")}
                  text="Giriş Yap"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Page>
  );
}
