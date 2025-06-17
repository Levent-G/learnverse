import React from "react";
import { Box, Typography } from "@mui/material";
import Page from "../../components/page/Page";
import CustomButton from "../../components/customButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { useColors } from "../../context/ColorContext";

export default function EmailVerificationNotice() {
  const navigate = useNavigate();

  const { colors } = useColors();

  return (
    <Page title="Kayıt Başarılı">
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" gutterBottom>
          Kayıt başarılı! Lütfen e-posta adresinize gelen doğrulama bağlantısına
          tıklayarak hesabınızı aktifleştirin.
        </Typography>
        <Typography variant="body2" mt={2}>
          Doğrulama işleminden sonra giriş yapabilirsiniz.
        </Typography>

        <Box mt={4}>
          <CustomButton
            onClick={() => navigate("/login")}
            text="Giriş Yap"
            sx={{
              backgroundColor: colors.primary,
              "&:hover": {
                backgroundColor: colors.primaryDark,
              },
              color: "#fff",
            }}
          />
        </Box>
      </Box>
    </Page>
  );
}
