import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Base from "../base/Base";
import { useColors } from "../../../context/ColorContext";

export function CustomInput({
  name,
  label,
  multiline = false,
  autoComplete,
  rows,
  disabled,
  ...props
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { colors } = useColors();

  return (
    <Base {...props}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            label={label}
            fullWidth
            margin="normal"
            multiline={multiline}
            rows={rows}
            disabled={disabled}
            type={props.type || "text"} 
            error={!!errors[name]}
            helperText={errors[name]?.message}
            variant="outlined"
            size="small"
            autoComplete={autoComplete || "current-password"}
            InputLabelProps={{ required: false }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: colors.primary,
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: colors.primary,
                },
              },
              ...props.sx,
            }}
            {...field}
            {...props} 
          />
        )}
      />
    </Base>
  );
}
