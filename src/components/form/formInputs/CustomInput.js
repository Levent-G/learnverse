import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Base from "../base/Base";

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
                  borderColor: "#9b59b6",
                },
              },
              "& .MuiInputLabel-root": {
                "&.Mui-focused": {
                  color: "#9b59b6",
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
