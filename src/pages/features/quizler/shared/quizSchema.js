import * as yup from "yup";

export const schemaChoose = yup.object().shape({
  level: yup.string().required("Seviye zorunludur"),
  count: yup.number().required("Soru sayısı zorunludur").min(1).max(100),
  category: yup
    .array()
    .of(yup.string())
    .min(1, "En az bir kategori seçmelisin"),
});

export const schemaRandom = yup.object({
  count: yup
    .number()
    .typeError("Soru sayısı bir sayı olmalı")
    .min(1, "En az 1 soru olmalı")
    .max(100, "En fazla 100 soru olabilir")
    .required("Soru sayısı zorunlu"),
});