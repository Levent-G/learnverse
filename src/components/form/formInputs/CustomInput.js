import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Base from "../base/Base";
import { useColors } from "../../../context/ColorContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export function CustomInput({
  name,
  label,
  multiline = false,
  autoComplete,
  rows,
  disabled,
  type = "text",
  ...props
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { colors } = useColors();

  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === "password";

  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);
  const handleMouseLeave = () => setShowPassword(false);
  const handleTouchStart = () => setShowPassword(true);
  const handleTouchEnd = () => setShowPassword(false);

  return (
    <Base {...props}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            fullWidth
            margin="normal"
            multiline={multiline}
            rows={rows}
            disabled={disabled}
            type={isPasswordType && !showPassword ? "password" : "text"}
            error={!!errors[name]}
            helperText={errors[name]?.message}
            variant="outlined"
            size="small"
            autoComplete={autoComplete || (isPasswordType ? "current-password" : "off")}
            InputLabelProps={{ required: false }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                backgroundColor: colors.backgroundLight,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                transition: "all 0.3s ease",
                "&:hover:not(.Mui-disabled):not(.Mui-error)": {
                  backgroundColor: colors.backgroundLightHover || "#fefefe",
                  boxShadow: `0 4px 12px ${colors.primary}40`,
                },
                "&.Mui-focused": {
                  backgroundColor: colors.backgroundLight,
                  boxShadow: `0 0 8px 2px ${colors.primary}80`,
                  borderColor: colors.primary,
                },
                "&.Mui-error": {
                  backgroundColor: "#fff0f0",
                  borderColor: colors.error || "#f44336",
                  boxShadow: `0 0 8px 2px ${colors.error}80`,
                },
                "& fieldset": {
                  borderWidth: 1.5,
                  borderColor: colors.border || "#ccc",
                },
              },
              "& .MuiInputLabel-root": {
                color: colors.textSecondary,
                fontWeight: 600,
                letterSpacing: 0.5,
                "&.Mui-focused": {
                  color: colors.primary,
                  fontWeight: 700,
                },
                "&.Mui-error": {
                  color: colors.error || "#f44336",
                },
              },
              "& .MuiFormHelperText-root": {
                color: colors.error || "#f44336",
                fontWeight: 500,
                marginTop: "4px",
              },
              ...props.sx,
            }}
            InputProps={{
              endAdornment: isPasswordType ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    edge="end"
                    size="large"
                    sx={{
                      color: colors.primary,
                      "&:hover": {
                        backgroundColor: colors.primaryLight + "22",
                      },
                      borderRadius: 1,
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            }}
            {...props}
          />
        )}
      />
    </Base>
  );
}
