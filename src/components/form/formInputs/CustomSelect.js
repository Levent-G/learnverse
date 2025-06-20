import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  ListItemText,
} from "@mui/material";
import { useColors } from "../../../context/ColorContext";

export function CustomSelect({ name, label, options = [], ...props }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { colors } = useColors();

  return (
    <FormControl
      fullWidth
      size="small"
      margin="normal"
      error={!!errors[name]}
      sx={{
        "& .MuiInputLabel-root": {
          color: colors.textSecondary,
          fontWeight: 500,
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: colors.primary,
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          transition: "all 0.25s ease-in-out",
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.primaryLight,
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: colors.primary,
            boxShadow: `0 0 0 2px ${colors.primary}30`,
          },
      }}
    >
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label={label}
            sx={{
              backgroundColor: colors.backgroundLight,
              fontWeight: 500,
            }}
            {...props}
          >
            {options.map((opt) => (
              <MenuItem key={opt} value={opt}>
                <ListItemText primary={opt} />
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
    </FormControl>
  );
}
