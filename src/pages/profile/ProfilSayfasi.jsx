import React, { useState } from "react";
import { Box, Typography, Paper, Avatar, Divider, Button } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import { useColors } from "../../context/ColorContext";
import { useApiRequest } from "../../hooks/useApiRequest";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/notify";
import SifreDegistirModal from "./SifreDegistirModal";
import ProfilGuncelleModal from "./ProfilGuncelleModal";
import QuizStats from "../features/quizler/components/QuizStats";

export default function ProfilSayfasi() {
  const { colors } = useColors();
  
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  
  const [openModal, setOpenModal] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const { request } = useApiRequest();
  const navigate = useNavigate();

  if (!userInfo) {
    return (
      <Typography variant="h6" color="error" sx={{ p: 4 }}>
        Kullanıcı bilgisi bulunamadı
      </Typography>
    );
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
    );

    if (!confirmed) return;

    const res = await request({
      url: `/auth/delete-account?email=${userInfo.email}`,
      method: "DELETE",
    });

    if (res.success) {
      notify("Hesabınız başarıyla silindi", "info");
      sessionStorage.clear();
      localStorage.clear();
      navigate("/login");
    } else {
      notify(res.error || "Hesap silinirken bir hata oluştu", "error");
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h4" fontWeight={700} color={colors.primaryDark}>
        👤 Profil Bilgileri
      </Typography>

      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          maxWidth: 500,
          width: "100%",
          backgroundColor: colors.neutralLight,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 2 }}>
          <Avatar
            sx={{
              width: 44,
              height: 44,
              bgcolor: colors.primary,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {userInfo.username?.[0]?.toUpperCase() || "?"}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {userInfo.name} {userInfo.surname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{userInfo.username}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            <EmailIcon sx={{ fontSize: 18, mr: 1 }} />
            E-posta
          </Typography>
          <Typography variant="body1">{userInfo.email}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            👤 Ad
          </Typography>
          <Typography variant="body1">{userInfo.name}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            👤 Soyad
          </Typography>
          <Typography variant="body1">{userInfo.surname}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            🧾 Kullanıcı Adı
          </Typography>
          <Typography variant="body1">{userInfo.username}</Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            🧾 Yaş
          </Typography>
          <Typography variant="body1">{userInfo.age}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setOpenUpdate(true)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderColor: colors.primary,
              color: colors.primary,
              "&:hover": {
                backgroundColor: colors.primaryLight + "22",
                borderColor: colors.primaryDark,
              },
            }}
          >
            Profili Güncelle
          </Button>
          <Button
            variant="contained"
            startIcon={<LockResetIcon />}
            onClick={() => setOpenModal(true)}
            sx={{
              backgroundColor: colors.secondary,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: colors.secondaryDark,
              },
            }}
          >
            Şifreyi Değiştir
          </Button>
        </Box>

        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={handleDeleteAccount}
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              fontSize: "0.8rem",
              padding: "4px 12px",
              "&:hover": {
                backgroundColor: "#ffebee",
              },
            }}
          >
            Hesabı Sil
          </Button>
        </Box>
      </Paper>

      <QuizStats />

      <SifreDegistirModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <ProfilGuncelleModal
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        defaultValues={userInfo}
      />
    </Box>
  );
}
