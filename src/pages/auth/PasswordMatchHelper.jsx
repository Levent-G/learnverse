import { Typography } from "@mui/material";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function PasswordMatchHelper() {
  const { control } = useFormContext();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  const isMatching = confirmPassword && password === confirmPassword;

  return (
    <Typography
      variant="caption"
      sx={{
        color: isMatching ? "green" : "error.main",
        mt: 0.5,
        ml: 0.5,
        fontSize: "0.75rem",
      }}
    >
      {confirmPassword ? !isMatching && "Şifreler eşleşmiyor" : ""}
    </Typography>
  );
}
