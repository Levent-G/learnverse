import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import * as yup from "yup";
import { notify } from "../../utils/notify";
import Form from "../../components/form/Form";
import { CustomInput } from "../../components/form/formInputs/CustomInput";
import CustomButton from "../../components/customButton/CustomButton";
import axios from "axios";
import { useColors } from "../../context/ColorContext";

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Geçerli bir e-posta giriniz")
    .required("E-posta zorunludur"),
});

export default function ForgotPasswordModal({ open, onClose }) {
  const { colors } = useColors();

  const handleSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8010/auth/forgot-password", data);
      notify(
        "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.",
        "success"
      );
      onClose();
    } catch (err) {
      notify(err.response?.data?.messages?.[0]?.text || "Bir hata oluştu", "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: colors.primaryLight,
          color: "white",
          fontWeight: "bold",
        }}
      >
        Şifremi Unuttum
      </DialogTitle>

      <DialogContent>
        <Form
          schema={forgotPasswordSchema}
          onSubmit={handleSubmit}
          submitText={null}
        >
          <CustomInput name="email" label="E-posta" />

          <DialogActions sx={{ mt: 2, justifyContent: "space-between" }}>
            <CustomButton
              type="button"
              onClick={onClose}
              variant="outlined"
              text="İptal"
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
              text="Gönder"
              sx={{
                backgroundColor: colors.primary,
                color: "#fff",
                "&:hover": {
                  backgroundColor: colors.primaryDark,
                },
              }}
            />
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
