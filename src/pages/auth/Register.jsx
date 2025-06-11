import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import Page from "../../components/page/Page";
import Form from "../../components/form/Form";
import { CustomInput } from "../../components/form/formInputs/CustomInput";
import CustomButton from "../../components/customButton/CustomButton";
import PasswordMatchHelper from "./PasswordMatchHelper";
import { registerSchema } from "./authSchema";
import { notify } from "../../utils/notify";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await axios.post("http://localhost:8010/auth/register", {
        email: data.email,
        password: data.password,
        username: data.username,
        name: data.name,
        surname: data.surname,
        age: data.age || null,
      });

      notify(
        "Kayıt başarılı! E-posta adresinize gelen bağlantıyla hesabınızı aktifleştirin.",
        "success"
      );

      setTimeout(() => navigate("/eposta-dogrulama"), 2000); // yeni yönlendirme
    } catch (err) {
      notify(
        "Kayıt başarısız: " +
          (err.response?.data?.messages?.[0]?.text ||
            "Kayıt işlemi sırasında bir hata oluştu."),
        "error"
      );
    }
  };

  return (
    <Page
      title={"Learnverse"}
      altTitle={"Hoş geldiniz! Kayıt olmak için bilgilerinizi girin."}
    >
      <Form schema={registerSchema} onSubmit={handleRegister} customButton>
        <CustomInput
          key="name"
          label="Ad"
          name="name"
          autoComplete="given-name"
        />
        <CustomInput
          key="surname"
          label="Soyad"
          name="surname"
          autoComplete="family-name"
        />
        <CustomInput
          key="username"
          label="Kullanıcı Adı"
          name="username"
          autoComplete="username"
        />
        <CustomInput
          key="email"
          label="Email"
          name="email"
          autoComplete="email"
        />
        <CustomInput
          key="age"
          label="Yaş"
          name="age"
          type="number"
          autoComplete="off"
          inputProps={{ min: 1 }}
        />
        <CustomInput
          key="password"
          label="Şifre"
          name="password"
          type="password"
          autoComplete="new-password"
        />
        <CustomInput
          key="confirmPassword"
          label="Şifre Tekrar"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
        />
        <PasswordMatchHelper />

        <Box sx={{ mt: 1, textAlign: "right" }}>
          <Box
            component="button"
            onClick={() => navigate("/giris")}
            sx={{
              border: "none",
              background: "none",
              color: "#9b59b6",
              cursor: "pointer",
              fontSize: "0.85rem",
              textDecoration: "underline",
            }}
          >
            Zaten hesabın var mı? Giriş yap
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <CustomButton type="submit" variant="contained" text="Kayıt Ol" />
          </Box>
        </Box>
      </Form>
    </Page>
  );
}
