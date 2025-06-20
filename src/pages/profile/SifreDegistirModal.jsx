import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { useApiRequest } from "../../hooks/useApiRequest";
import { notify } from "../../utils/notify";
import { CustomInput } from "../../components/form/formInputs/CustomInput";
import Form from "../../components/form/Form";

const schema = yup.object({
  oldPassword: yup.string().required("Eski şifre gerekli"),
  newPassword: yup
    .string()
    .min(6, "En az 6 karakter")
    .required("Yeni şifre gerekli"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Şifreler eşleşmiyor")
    .required("Yeni şifre tekrarı gerekli"),
});

export default function SifreDegistirModal({ open, onClose }) {
  const { request } = useApiRequest();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const handleSubmit = async (data) => {
    const payload = {
      email: userInfo.email,
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    const res = await request({
      url: "/auth/reset-password",
      method: "POST",
      body: payload,
    });

    if (res.success) {
      notify("Şifre başarıyla değiştirildi", "success");
      onClose();
    } else {
      notify(res.error || "Şifre değiştirilemedi", "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography fontWeight={600}>🔐 Şifre Değiştir</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Form schema={schema} onSubmit={handleSubmit} submitText="Şifreyi Güncelle">
          <CustomInput name="oldPassword" label="Eski Şifre" type="password" />
          <CustomInput name="newPassword" label="Yeni Şifre" type="password" />
          <CustomInput
            name="confirmNewPassword"
            label="Yeni Şifre (Tekrar)"
            type="password"
          />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
