import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Page from "../../components/page/Page";
import Form from "../../components/form/Form";
import { CustomInput } from "../../components/form/formInputs/CustomInput";
import CustomButton from "../../components/customButton/CustomButton";
import { loginSchema } from "./authSchema";
import { notify } from "../../utils/notify";
import { useAuth } from "../../contexts/AuthContext";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useColors } from "../../context/ColorContext";

export default function Login() {
  const { colors } = useColors();

  const [forgotOpen, setForgotOpen] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (data) => {
    const { email, password } = data;

    const result = await login(email, password);

    if (result.success) {
      notify("Giriş başarılı!", "success");
      navigate("/ana-sayfa");
    } else {
      notify(result.error || "Giriş başarısız", "error");

      if (result.active === false) {
        setTimeout(() => navigate("/eposta-dogrulama"), 2000);
      }
    }
  };

  return (
    <Page
      title={"Learnverse"}
      altTitle={"Hoş geldiniz! Giriş yapmak için bilgilerinizi girin."}
    >
      <Form schema={loginSchema} onSubmit={handleLogin} customButton={true}>
        <CustomInput key="email" label="Email" name="email" />

        <CustomInput
          key="sifre"
          label="Şifre"
          name="password"
          autoComplete="current-password"
          type="password"
        />

        <Box sx={{ textAlign: "right" }}>
          <Box
            component="button"
            type="button"
            onClick={() => setForgotOpen(true)}
            sx={{
              border: "none",
              background: "none",
              color: colors.primary, // Burada palette'den renk kullandık
              cursor: "pointer",
              fontSize: "0.8rem",
              textDecoration: "underline",
              "&:hover": {
                color: colors.primaryDark, // Hover rengini biraz koyultabiliriz
              },
              transition: "color 0.3s ease",
            }}
          >
            Şifremi Unuttum
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <CustomButton
              type="button"
              onClick={() => navigate("/kayit")}
              variant="outlined"
              text="Kayıt Ol"
              sx={{
                borderColor: colors.primary,
                color: colors.primary,
                "&:hover": {
                  backgroundColor: colors.primaryLight,
                  borderColor: colors.primaryLight,
                },
              }}
            />
            <CustomButton
              type="submit"
              variant="contained"
              text="Giriş Yap"
              sx={{
                backgroundColor: colors.primary,
                "&:hover": {
                  backgroundColor: colors.primaryDark,
                },
              }}
            />
          </Box>
        </Box>
      </Form>

      <ForgotPasswordModal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />
    </Page>
  );
}
