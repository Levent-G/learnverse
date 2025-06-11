import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("Ad zorunludur"),
  surname: yup.string().required("Soyad zorunludur"),
  username: yup.string().required("Kullanıcı adı zorunludur"),
  email: yup
    .string()
    .email("Geçerli bir email giriniz")
    .required("Email zorunludur"),
  password: yup
    .string()
    .required("Şifre zorunludur")
    .min(8, "Şifre en az 8 karakter olmalı")
    .max(64, "Şifre en fazla 64 karakter olmalı")
    .matches(/[A-Z]/, "Şifre en az bir büyük harf içermeli")
    .matches(/[a-z]/, "Şifre en az bir küçük harf içermeli")
    .matches(/\d/, "Şifre en az bir rakam içermeli")
    .matches(/[^A-Za-z0-9]/, "Şifre en az bir özel karakter içermeli"),
  confirmPassword: yup
    .string()
    .required("Şifre tekrarı zorunludur")
    .oneOf([yup.ref("password"), null], "Şifreler eşleşmiyor"),
  age: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .min(1, "Yaş negatif veya sıfır olamaz.")
    .typeError("Yaş sayısal olmalıdır."),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email giriniz")
    .required("Email zorunludur"),
  password: yup.string().required("Şifre zorunludur"),
});
