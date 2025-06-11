import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import { notify } from "../../utils/notify";
import Page from "../../components/page/Page";
import Form from "../../components/form/Form";
import { CustomInput } from "../../components/form/formInputs/CustomInput";
import CustomButton from "../../components/customButton/CustomButton";

const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required("Yeni şifre zorunludur")
    .min(8, "Şifre en az 8 karakter olmalı")
    .max(64, "Şifre en fazla 64 karakter olabilir")
    .matches(/[a-z]/, "Şifre en az 1 küçük harf içermeli")
    .matches(/[A-Z]/, "Şifre en az 1 büyük harf içermeli")
    .matches(/\d/, "Şifre en az 1 rakam içermeli")
    .matches(/[^a-zA-Z0-9]/, "Şifre en az 1 özel karakter içermeli"),
});

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8010/auth/reset-password", {
        token,
        newPassword: data.newPassword,
      });
      notify("Şifreniz başarıyla güncellendi", "success");
      navigate("/giris");
    } catch (err) {
      notify(err.response?.data?.messages?.[0]?.text || "Şifre sıfırlama başarısız", "error");
    }
  };

  if (!token) {
    return (
      <Page title="Hata">
        <p>Geçersiz veya eksik bağlantı. Lütfen tekrar deneyin.</p>
      </Page>
    );
  }

  return (
    <Page title="Yeni Şifre Belirle" altTitle="Yeni şifrenizi giriniz" >
      <Form schema={resetPasswordSchema} onSubmit={handleSubmit} customButton={true}>
        <CustomInput
          name="newPassword"
          label="Yeni Şifre"
          type="password"
          autoComplete="new-password"
        />
        <CustomButton
          type="submit"
          text="Şifreyi Güncelle"
          variant="contained"
          sx={{float:"right",mt:1}}
        />
      </Form>
    </Page>
  );
}
