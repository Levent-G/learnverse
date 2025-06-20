
import * as yup from "yup";

export const schema = yup.object({
    name: yup.string().required("Ad gerekli"),
    surname: yup.string().required("Soyad gerekli"),
    username: yup.string().required("Kullanıcı adı gerekli"),
    email: yup.string().email("Geçerli bir e-posta girin").required("E-posta gerekli"),
  });