import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useApiRequest } from "../../hooks/useApiRequest";
import { notify } from "../../utils/notify";
import { CustomInput } from "../../components/form/formInputs/CustomInput";
import Form from "../../components/form/Form";
import { schema } from "./shared/profileSchema";

export default function ProfilGuncelleModal({ open, onClose, defaultValues }) {
  const { request } = useApiRequest();

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const userId = userInfo?.id;

  const handleSubmit = async (data) => {
    const res = await request({
      url: "/user/updateUser",
      method: "PUT",
      params: { id: userId }, // query parametre olarak id ekleniyor
      body: data, // güncellenen profil bilgileri
    });

    if (res.success) {
      notify("Profil bilgileri güncellendi", "success");
      sessionStorage.setItem("userInfo", JSON.stringify(data)); // local olarak güncelle
      onClose();
      window.location.reload(); // sayfayı yenileyerek yansıt
    } else {
      notify(res.error || "Profil güncellenemedi", "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontWeight={600}>✏️ Profili Güncelle</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Form
          schema={schema}
          onSubmit={handleSubmit}
          submitText="Güncelle"
          defaultValues={defaultValues}
        >
          <CustomInput name="name" label="Ad" />
          <CustomInput name="surname" label="Soyad" />
          <CustomInput name="username" label="Kullanıcı Adı" />
          <CustomInput name="age" label="Yaş" />
          <CustomInput name="email" label="E-posta" />
        </Form>
      </DialogContent>
    </Dialog>
  );
}
