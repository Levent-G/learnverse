import * as yup from "yup";

export const schema = yup.object().shape({
  level: yup.string().required("Seviye seçimi zorunludur."),
  category: yup.string().required("Kategori seçimi zorunludur."),
});
