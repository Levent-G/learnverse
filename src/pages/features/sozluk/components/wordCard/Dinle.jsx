import { Button } from "@mui/material";
import { colors, hexToRgba } from "./shared/wordCardEnums";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const Dinle = ({ onClick }) => {
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        startIcon={<VolumeUpIcon fontSize="small" />}
        onClick={onClick}
        sx={{
          color: colors.accent,
          borderColor: hexToRgba(colors.accent, 0.6),
          fontWeight: 500,
          textTransform: "none",
          fontSize: "0.75rem",
          ml: "auto",
          mb: 1,
          px: 1.5,
          py: 0.4,
          borderRadius: 1.5,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: hexToRgba(colors.accent, 0.1),
            borderColor: colors.accent,
            transform: "scale(1.02)",
          },
        }}
      >
        Dinle
      </Button>
    </>
  );
};

export default Dinle;
